module CloudForms
  module Vm
    class Service < ::Service
      state_machine :state do
        event :done do
          transition provisioning: :powered_on, if: :vm_on?
          transition provisioning: :powered_off
          transition powering_on: :powered_on
          transition powering_off: :powered_off
          transition rebooting: :powered_on, if: :vm_on?
          transition rebooting: :powered_off
          transition deprovisioning: :deprovisioned
        end

        event :deprovision do
          transition to: :deprovisioning
        end

        event :power_on do
          transition [:provisioned, :powered_off] => :powering_on, unless: :vm_on?
          transition [:provisioned, :powered_off] => :powered_on
        end

        event :power_off do
          transition [:provisioned, :powered_on] => :powering_off, unless: :vm_off?
          transition [:provisioned, :powered_on] => :powered_off
        end

        event :reboot do
          transition [:provisioned, :powered_on] => :rebooting
        end

        after_transition to: :powering_on, do: :start_powering_on
        after_transition to: :powering_off, do: :start_powering_off
        after_transition to: :rebooting, do: :start_rebooting
        after_transition to: :deprovisioning, do: :start_deprovisioning

        state :powered_on
        state :powered_off
      end

      def monitor_frequency_for(state)
        case state.to_sym
        when :powered_on, :powered_off
          60
        when :provisioning, :deprovisioning, :powering_on, :powering_off, :rebooting
          10
        else
          super
        end
      end

      def billable_for(state)
        case state.to_sym
        when :pending
          super
        when :deprovisioned
          false
        else
          true
        end
      end

      def self.combine_settings(product_settings, user_settings)
        combined_settings = {
          guid: product_settings['guid'],
          vm_fields: product_settings['vm_fields'].map { |v| [v['name'], v['value']] }.to_h,
          tags: product_settings['tags'].map { |v| [v['name'], v['value']] }.to_h,
          ems_custom_attributes: product_settings['ems_attrs'].map { |v| [v['name'], v['value']] }.to_h,
          miq_custom_attributes: product_settings['miq_attrs'].map { |v| [v['name'], v['value']] }.to_h
        }

        combined_settings[:vm_fields].merge! user_settings['vm_fields'].map { |v| [v['name'], v['value']] }.to_h

        # Ensure some settings exist
        combined_settings[:vm_fields]['vm_name'] ||= generate_vm_name

        combined_settings
      end

      def start_provisioning
        resource = {
          version: '1.1',
          template_fields: { guid: self.settings['guid'] },
          vm_fields: self.settings['vm_fields'] || {},
          requester: {
            owner_first_name: 'Project',
            owner_last_name: 'Jellyfish',
            owner_email: user.email
          },
          tags: self.settings['tags'] || {},
          ems_custom_attributes: self.settings['ems_custom_attributes'] || {},
          miq_custom_attributes: self.settings['miq_custom_attributes'] || {}
        }

        response = provider.client.provision_requests.create body: { resource: resource }
        results = response['results'].first
        self.status_message = results['message']
        self.details['provision_request_id'] = results['id']
      rescue => error
        errored!
        self.status_message = error.message
      ensure
        save
      end

      def check_provisioning_status
        while provisioning?
          sleep 5 # TODO: sleeping? maybe a block taking method with yield with options might be better
          results = provider.client.provision_requests.find "#{self.details['provision_request_id']}?expand=tasks"
          update_attributes status_message: results['message']
          raise results['message'] if results['status'].downcase == 'error'

          next unless results.key? 'tasks'

          task = results['tasks'].last
          raise task['message'] if task['status'].downcase == 'error'

          # downcase to avoid '[fF]inished'
          if results['request_state'].downcase == 'finished'
            self.details['instance_id'] = task['destination_id']
            update_status
            done!
          end
        end
      rescue => error
        errored!
        self.status_message = error.message
      ensure
        save
      end

      def start_deprovisioning
        # Already retired? We're done.
        if self.details['retired']
          done!
          return
        end

        terminate_results = provider.client.instances.terminate details['instance_id']

        self.status_message = terminate_results['message']

        self.details['terminate_task_id'] = terminate_results['task_id']
      rescue => error
        errored!
        self.status_message = error.message
      end

      def check_deprovisioning_status
        while deprovisioning?
          sleep 5 # TODO: needs DRYing

          task = provider.client.tasks.find details['terminate_task_id']

          # task['status'] could be 'Error'; Needs handling
          if task['state'].downcase == 'finished'
            update_status
            self.status_message = task['message']
          end

          done! if self.details['retired']
        end
      end

      def check_powered_on_status
        update_status
      end

      alias_method :check_powered_off_status, :check_powered_on_status

      def start_powering_on
        if vm_on?
          done!
          return
        end

        task_results = provider.client.instances.start details['instance_id']
        self.status_message = task_results['message']
        self.details['power_on_task_id'] = task_results['task_id']
      end

      def check_powering_on_status
        while powering_on?
          sleep 5

          update_status

          done! if vm_on?
        end
      end

      def start_powering_off
        if vm_off?
          done!
          return
        end

        task_results = provider.client.instances.stop details['instance_id']

        self.status_message = task_results['message']

        self.details['power_off_task_id'] = task_results['task_id']
      end

      def check_powering_off_status
        while powering_off?
          sleep 5

          update_status

          done! if vm_off?
        end
      end

      def do_reboot
      end

      def check_rebooting_status
      end

      def vm_on?
        self.details['power_state'] == 'on'
      end

      def vm_off?
        self.details['power_state'] == 'off'
      end

      private

      ADJ = %w(hot cold big little massive tiny heavy light dark heated frosty mild wet damp dry cracked leaning standing sitting left right top bottom).freeze
      NOUNS = %w(city town state county country street road trail trip jaunt adventure car truck wagon carriage wood metal glass plastic earth air wind fire flame water ice).freeze

      def update_status
        attributes = 'disks,provisioned_storage,ipaddresses,mem_cpu,num_cpu,cpu_total_cores,cpu_cores_per_socket'
        instance_details = provider.client.instances.find "#{details['instance_id']}?attributes=#{attributes}"

        self.details['name'] = instance_details['name']
        self.details['vendor'] = instance_details['vendor']
        self.details['power_state'] = instance_details['power_state'].downcase
        ips = partition_ips instance_details['ipaddresses']
        self.details['public_ips'] = ips[1].sort
        self.details['private_ips'] = ips[0].sort
        self.details['disk_size'] = instance_details['provisioned_storage'].to_i / 1024 / 1024 # Returns in B, reduce to in MB
        self.details['memory'] = instance_details['mem_cpu']
        self.details['cpu_count'] = instance_details['num_cpu']
        self.details['core_count'] = instance_details['cpu_total_cores']
        self.details['retired'] = instance_details.fetch('retired', false) || instance_details['raw_power_state'] == 'DELETED'

        case details['power_state']
        when 'on'
          power_on
        when 'off'
          power_off
        else
          # noop
        end

        if self.details['retired']
          deprovision
        end

        save if changed?
      end

      def generate_vm_name
        [ADJ.sample, NOUNS.sample, rand(1000..9999)].join '-'
      end

      def partition_ips(ips)
        ips.partition do |ip|
          octets = ip.split('.').map &:to_i

          (octets[0] == 10) ||
            ((octets[0] == 172) && (octets[1] >= 16) && (octets[1] <= 31)) ||
            ((octets[0] == 192) && (octets[1] == 168))
        end
      end
    end
  end
end
