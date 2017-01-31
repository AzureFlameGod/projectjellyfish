module Cart
  class Search < ApplicationService
    include Model
    include Policy

    model ServiceRequest, :collection
    policy CartPolicy

    private

    def collection_model!
      policy_scope(super).where(status: :cart)
    end
  end
end
