class ServiceSerializer < ApplicationSerializer
  attributes :user_id, :provider_id, :product_id, :project_id, :service_request_id, :service_order_id
  attributes :name, :state, :billable, :hourly_price, :monthly_price
  attributes :last_changed_at, :last_checked_at
  attributes :created_at, :updated_at

  field :monitor_frequency

  field :status_message
  field :type_name, as: :type
  field :settings, :details, :actions

  filter :with_states

  has_one :user
  has_one :provider
  has_one :product
  has_one :project
  has_one :service_request
  has_one :service_order

  def actions
    object.actions.split ','
  end
end
