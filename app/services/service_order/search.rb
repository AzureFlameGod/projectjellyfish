class ServiceOrder < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model ServiceOrder, :collection
    policy ServiceOrderPolicy

    private

    def collection_model!
      policy_scope(super)
    end
  end
end
