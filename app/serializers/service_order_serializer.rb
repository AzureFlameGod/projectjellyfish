class ServiceOrderSerializer < ApplicationSerializer
  attributes :user_id, :status, :setup_total, :monthly_total
  attributes :ordered_count, :approved_count, :denied_count
  attributes :ordered_at, :completed_at, :created_at, :updated_at

  has_one :user
  has_one :processor
  has_many :service_requests
end
