class ServiceRequest < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model ServiceRequest, :collection
    policy ServiceRequestPolicy

    private

    def collection_model!
      policy_scope(super)
    end
  end
end
