class ProviderTypeSerializer < ApplicationSerializer
  attribute :type_name, as: :type
  attributes :name, :description, :active, :tag_list

  has_many :providers
  has_many :product_types

  def tag_list
    object.tag_list
  end
end
