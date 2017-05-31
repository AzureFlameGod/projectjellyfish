class ProviderData < ApplicationRecord
  class SyncJob < ApplicationJob
    def perform(provider_id, last_synced_at)
      ProviderData::Sync.run context: nil, params: { provider_id: provider_id, last_synced_at: last_synced_at }
    end
  end
end
