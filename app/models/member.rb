class Member < ApplicationRecord
  belongs_to :membership
  belongs_to :user
  belongs_to :project

  enum role: Membership::ROLES

  # View backed model
  def readonly?
    true
  end
end
