class ProviderDataSerializer < ApplicationSerializer
  attributes :data_type, :name, :description, :ext_id, :ext_group_id, :deprecated
  filter :available
  has_one :provider
end
