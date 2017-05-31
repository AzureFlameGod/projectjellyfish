class MembershipSerializer < ApplicationSerializer
  attributes :role, :locked, :created_at, :updated_at

  has_one :project
  has_one :user
end
