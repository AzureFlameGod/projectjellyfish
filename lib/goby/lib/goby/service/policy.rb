module Goby
  class Service
    NotAuthorizedError = Class.new(StandardError)

    module Policy
      extend ActiveSupport::Concern

      def policy_scope(scope)
        policy_scope_class.new(policy_context, scope).resolve
      end

      private

      def authorize!
        raise NotAuthorizedError unless policy_class.new(policy_context, model).send policy_action
      end

      # Override as needed
      def policy_context
        context
      end

      def policy_class
        self.class.policy_class
      end

      def policy_scope_class
        self.class.policy_class::Scope
      end

      def policy_action
        self.class.policy_action
      end

      module ClassMethods
        attr_reader :policy_class, :policy_action

        def policy(policy_class, policy_action = nil)
          @policy_class = policy_class

          unless policy_action
            policy_action = "#{to_s.demodulize.underscore}?".to_sym
          end

          @policy_action = policy_action
        end
      end
    end
  end
end
