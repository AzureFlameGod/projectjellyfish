class ProductType < ApplicationRecord
  belongs_to :provider_type

  # Optional: Override in each product type to customize product class name
  def self.product_class
    to_s.sub(/Type\z/, '').constantize
  end

  # Optional: Override in each product type
  # Properties are used to create a comparable list of properties;
  # The list of strings are turned into labels that will have values manager supplied/changed values on the products
  # example: [ {name: 'CPUs', value: '1'}, ...]
  def properties
    []
  end

  # Optional: Override in each product type
  # settings are used to create a products initial settings
  # Product.settings are later combined with a ServiceRequest.settings to create the Service.settings
  def default_settings
    # Used to initialize the product.
    {}
  end

  # Optional: Override in each product type
  def tag_list
    []
  end

  # All product types use the same serializer
  def serializer_class_name
    'ProductTypeSerializer'
  end
end
