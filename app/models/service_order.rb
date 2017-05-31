class ServiceOrder < ApplicationRecord
  belongs_to :user
  has_many :service_requests

  enum status: { cart: 0, pending: 1, complete: 2 }
end
