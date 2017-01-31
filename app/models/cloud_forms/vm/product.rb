module CloudForms
  module Vm
    class Product < ::Product
      setting :guid
      setting :vm_fields
      setting :service_fields
      setting :tags
      setting :ems_attrs
      setting :miq_attrs

      def self.settings_schema(_mode = :create)
        miq_pair = Dry::Validation.Schema do
          required(:name).filled(:str?)
          required(:value).filled(:str?)
        end

        service_field_pair = Dry::Validation.Schema do
          required(:name).filled(:str?)
          required(:value).maybe(:str?)
        end

        Dry::Validation.Schema(build: false) do
          required(:guid).filled(:str?)
          required(:vm_fields).each miq_pair
          optional(:service_fields).each service_field_pair
          optional(:tags).each miq_pair
          optional(:ems_attrs).each miq_pair
          optional(:miq_attrs).each miq_pair
        end
      end

      def default_settings
        {
          vm_fields: settings['service_fields']
        }
      end
    end
  end
end
