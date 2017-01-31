class Provider < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model Provider, :collection
    policy ProviderPolicy

    sort_by name: :asc
  end
end
