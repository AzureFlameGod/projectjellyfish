class ProviderType < ApplicationRecord
  has_many :providers

  # Optional: Override in each provider type to customize provider class name
  def self.provider_class
    to_s.sub(/Type\z/, '').constantize
  end

  # Optional: Override in each provider type
  def tag_list
    []
  end

  def serializer_class_name
    'ProviderTypeSerializer'
  end
end
