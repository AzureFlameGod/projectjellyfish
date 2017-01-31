class ServiceOrder < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ServiceOrder, :find
    policy ServiceOrderPolicy
  end
end
