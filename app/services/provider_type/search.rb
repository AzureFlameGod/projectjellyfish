class ProviderType < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model ProviderType, :collection
    policy ProviderTypePolicy, :search?

    sort_by name: :asc
  end
end
