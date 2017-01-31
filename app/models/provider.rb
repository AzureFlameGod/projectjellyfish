class Provider < ApplicationRecord
  include PgSearch

  acts_as_taggable
  acts_as_paranoid

  belongs_to :provider_type
  has_many :product_types, primary_key: :provider_type_id, foreign_key: :provider_type_id
  has_many :products

  pg_search_scope :search, against: %i(name description cached_tag_list), using: {
    tsearch: {
      dictionary: 'english',
      tsvector_column: :tsv
    }
  }

  class << self
    def credential(key, encrypted: false)
      if encrypted
        define_method(key.to_sym) { decrypt credentials["encrypted_#{key}"] }
        define_method("#{key}=".to_sym) do |value|
          self[:credentials]["encrypted_#{key}"] = encrypt(value)
        end
      else
        define_method(key.to_sym) { credentials[key.to_s] }
        define_method("#{key}=".to_sym) do |value|
          self[:credentials][key.to_s] = value
        end
      end
    end
  end

  def valid_credentials?
    true
  end

  def client
    nil
  end

  # This is here because of a bug : https://github.com/mbleigh/acts-as-taggable-on/issues/432
  def self.caching_tag_list_on?(context)
    true
  end

  # All Providers use the same serializer
  def serializer_class_name
    'ProviderSerializer'
  end
end
