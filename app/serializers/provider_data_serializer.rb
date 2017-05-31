class ProviderDataSerializer < ApplicationSerializer
  attributes :data_type, :name, :ext_id, :ext_group_id, :deprecated
  fields :description, :properties

  filter :like
  filters :available, :provider_id

  has_one :provider
end
