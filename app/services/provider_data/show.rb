class ProviderData < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ProviderData, :find
    policy ProviderDataPolicy
  end
end
