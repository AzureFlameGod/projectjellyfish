class Provider < ApplicationRecord
  module ProductTypes
    class Search < ApplicationService
      include Model
      include Policy

      model ProductType, :collection
      policy ProductTypePolicy

      def collection_model!
        provider = Provider.find(params[:provider_id])
        super.where(provider_type_id: provider.provider_type_id)
      end
    end
  end
end
