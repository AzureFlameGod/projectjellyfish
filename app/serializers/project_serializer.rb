class ProjectSerializer < ApplicationSerializer
  attributes :name, :budget, :spent, :monthly_spend, :created_at, :updated_at
  attributes :last_hourly_compute_at, :last_monthly_compute_at
  fields :description

  filter :accepts

  has_many :services
  has_many :memberships
  has_many :users
end
