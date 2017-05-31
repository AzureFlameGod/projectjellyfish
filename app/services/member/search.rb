class Member < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model Member, :collection
    policy MemberPolicy

    sort_by user_name: :asc

    private

    def collection_model!
      policy_scope(super)
    end
  end
end
