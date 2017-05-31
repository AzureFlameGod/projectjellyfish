class Provider < ApplicationRecord
  class Destroy < ApplicationService
    include Model
    include Policy

    model Provider, :find
    policy ProviderPolicy, :destroy?

    def perform
      model.destroy
    end
  end
end
