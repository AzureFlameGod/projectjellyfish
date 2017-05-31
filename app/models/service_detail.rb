class ServiceDetail < ApplicationRecord
  belongs_to :requester, class_name: '::User'
  belongs_to :product
  belongs_to :project
  belongs_to :service
  belongs_to :service_request

  # View backed model
  def readonly?
    true
  end

  # TODO: Remove this after removing the price columns from service_requests; use the products.*_price columns
  def monthly_cost
    (hourly_price || 0) * 730 + (monthly_price || 0)
  end
end
