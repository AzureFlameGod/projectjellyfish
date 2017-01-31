module CloudForms
  module Vm
    class ProductType < ::ProductType::Vm
      def default_settings
        super.merge({
          guid: '',
          vm_fields: [],
          service_fields: [],
          tags: [],
          ems_attrs: [],
          miq_attrs: []
        })
      end

    end
  end
end
