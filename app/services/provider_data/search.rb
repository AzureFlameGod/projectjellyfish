class ProviderData < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model ProviderData, :collection
    policy ProviderDataPolicy

    sort_by name: :asc

    private

    def setup_params!
      params[:filter] ||= []
      params[:filter].push(available: true) unless params[:filter].inject({}, :merge).key? :available
      super
    end
  end
end
