class ServiceRequest < ApplicationRecord
  class Destroy < ApplicationService
    include Model
    include Policy

    model ServiceRequest, :find
    policy ServiceRequestPolicy

    def perform
      model.destroy
    end
  end
end
