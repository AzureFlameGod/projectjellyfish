require 'product'

module CloudForms
  module Automation
    class Product < ::Product
      setting :miq_namespace
      setting :miq_class
      setting :miq_instance

      def self.settings_schema(_mode = :create)
        Dry::Validation.Schema(build: false) do
          required(:miq_namespace).filled(:str?)
          required(:miq_class).filled(:str?)
          required(:miq_instance).filled(:str?)
        end
      end
    end
  end
end
