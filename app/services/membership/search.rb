class Membership < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model Membership, :collection
    policy MembershipPolicy

    private

    def collection_model!
      policy_scope(super)
    end
  end
end
