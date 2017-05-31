require 'test_helper'

class SyncTest < ActiveSupport::TestCase
  test 'performs sync' do
    provider = providers(:cloud_forms)
    result = ProviderData::Sync.run context: users(:user), params: { provider_id: provider.id, last_synced_at: nil }
  end

end
