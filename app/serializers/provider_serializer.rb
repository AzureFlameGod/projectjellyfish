class ProviderSerializer < ApplicationSerializer
  attributes :name, :description, :active, :credentials_message, :status_message, :connected, :provider_type_id
  attributes :created_at, :updated_at
  attributes :credentials_validated_at, :last_connected_at, :last_synced_at, filter: false

  field :type_name, as: :type
  fields :credentials, :tag_list

  has_one :provider_type
  has_many :product_types
  has_many :products
end
