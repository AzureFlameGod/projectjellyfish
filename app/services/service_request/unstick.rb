class ServiceRequest < ApplicationRecord
  class Unstick < ApplicationService
    include Model

    model ServiceRequest, :find

    def perform
      model.fire_events :approve
      model.save
    end
  end
end
