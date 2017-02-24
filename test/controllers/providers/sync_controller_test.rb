require 'test_helper'

class Providers::SyncControllerTest < ActionDispatch::IntegrationTest
  test 'should create new sync job on create' do
    headers = authorize users(:admin)
    provider = providers :cloud_forms
    assert_enqueued_jobs 1 do
      post provider_sync_url(provider), headers: headers
    end
  end
end
