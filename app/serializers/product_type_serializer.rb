class ProductTypeSerializer < ApplicationSerializer
  attributes :name, :description, :active, :provider_type_id

  field :type_name, as: :type
  field :tag_list, :properties, :default_settings

  has_one :provider_type

  def tag_list
    object.tag_list
  end
end
