class ServiceRequestSerializer < ApplicationSerializer
  attributes :user_id, :processor_id, :product_id, :project_id, :service_order_id
  attributes :service_name, :state
  attributes :setup_price, :hourly_price, :monthly_price
  attributes :created_at, :updated_at

  field :type_name, as: :type
  fields :settings, :monthly_cost, :request_message, :processed_message

  filter :with_states

  has_one :user
  has_one :processor
  has_one :project
  has_one :product
  has_one :service_order
  has_one :service

  def settings
    object.settings.reject { |k, _v| k[/\Aencrypted_/] }
  end
end
