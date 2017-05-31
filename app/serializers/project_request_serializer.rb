class ProjectRequestSerializer < ApplicationSerializer
  attributes :name, :status, :budget, :user_id, :project_id, :created_at, :updated_at

  fields :request_message, :processed_message

  has_one :user
  has_one :processor
  has_one :project
end
