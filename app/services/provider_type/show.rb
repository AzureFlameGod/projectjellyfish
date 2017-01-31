class ProviderType < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ProviderType, :find
    policy ProviderTypePolicy, :show?
  end
end
