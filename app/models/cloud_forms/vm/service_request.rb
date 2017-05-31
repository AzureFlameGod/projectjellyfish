module CloudForms
  module Vm
    class ServiceRequest < ::ServiceRequest
      # setting :vm_fields

      # def self.settings_schema(_mode = :create)
      #   miq_pair = Dry::Validation.Schema do
      #     required(:name).filled(:str?)
      #     required(:value).filled(:str?)
      #   end
      #
      #   Dry::Validation.Schema(build: false) do
      #     required(:vm_fields).each miq_pair
      #   end
      # end
    end
  end
end
