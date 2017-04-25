class ServiceRequest < ApplicationRecord
  class Unstick < ApplicationService
    include Model

    model ServiceRequest, :find

    def perform
      model.fire_events :approved
      model.save
    end
  end
end
