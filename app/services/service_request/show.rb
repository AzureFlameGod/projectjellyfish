class ServiceRequest < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ServiceRequest, :find
    policy ServiceRequestPolicy
  end
end
