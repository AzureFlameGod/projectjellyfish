class Provider < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model Provider, :find
    policy ProviderPolicy, :show?
  end
end
