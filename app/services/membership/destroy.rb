class Membership < ApplicationRecord
  class Destroy < ApplicationService
    include Model
    include Policy

    model Membership, :find
    policy MembershipPolicy

    def perform
      model.destroy
    end
  end
end
