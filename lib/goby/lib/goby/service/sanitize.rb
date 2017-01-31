module Goby
  class Service
    module Sanitize
      extend ActiveSupport::Concern

      private

      def sanitize_params!
        result = sanitize_schema.call(params)
        @params = result.output if result.success?

        raise Goby::Exceptions::ValidationErrors.new(result.errors) unless result.success?

        result
      end

      def sanitize_schema
        self.class.sanitize_schema
      end

      class SanitizeSchema < Dry::Validation::Schema
        configure do
          config.input_processor = :sanitizer
          config.type_specs = true
        end
      end

      module ClassMethods
        attr_reader :sanitize_schema

        def sanitize(&block)
          @sanitize_schema = Dry::Validation.Schema SanitizeSchema, &block
        end
      end
    end
  end
end
