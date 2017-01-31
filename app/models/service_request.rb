class ServiceRequest < ApplicationRecord
  extend Settings

  acts_as_paranoid

  belongs_to :user
  belongs_to :processor, class_name: '::User'
  belongs_to :product
  belongs_to :project
  belongs_to :service_order
  has_one :service

  state_machine :state, initial: :pending do
    event :configure do
      transition [:pending, :configured] => :configured
    end

    event :order do
      transition configured: :approved, if: -> { AppSetting.current.auto_approve_services }
      transition configured: :ordered
    end

    event :approve do
      transition ordered: :approved
    end

    after_transition to: :approved do |request, _transition|
      ServiceRequest::BuildServiceJob.set(wait: ApplicationJob::WAIT).perform_later request.id
    end

    event :deny do
      transition ordered: :denied
    end
  end

  # Optional: Override in each service request to customize service class name
  def self.service_class
    self.to_s.sub(/Request\z/, '').constantize
  end

  # Optional: Override in each service request to define a validation schema for settings
  def self.settings_schema(_mode = :create)
    Dry::Validation.Schema(build: false)
  end

  # TODO: Remove this after removing the price columns from service_requests; use the products.*_price columns
  def monthly_cost
    (hourly_price || 0) * 730 + (monthly_price || 0)
  end

  # All ServiceRequests use the same serializer
  def serializer_class_name
    'ServiceRequestSerializer'
  end
end
