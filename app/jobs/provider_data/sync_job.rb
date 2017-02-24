class ProviderData < ApplicationRecord
  class SyncJob < ApplicationJob
    def perform(params)
      ProviderData::Sync.run context: nil, params: params
    end
  end
end
