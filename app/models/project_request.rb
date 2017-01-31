class ProjectRequest < ApplicationRecord
  belongs_to :user
  belongs_to :processor, class_name: 'User'
  belongs_to :project

  enum status: { pending: 0, approved: 1, denied: 2 }
end
