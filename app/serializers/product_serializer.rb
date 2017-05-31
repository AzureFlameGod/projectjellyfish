class ProductSerializer < ApplicationSerializer
  attributes :provider_id, :product_type_id, sort: false
  attributes :name, :description, :active, :setup_price, :hourly_price, :monthly_price, :tag_list
  attributes :created_at, :updated_at

  field :type_name, as: :type
  field :monthly_cost, :properties, :settings, :default_settings

  # Filters provided by methods and scopes
  filters :tagged_with, :tagged_with_any, :not_tagged_with, :search, :project_policy

  has_one :provider
  has_one :product_type
end
