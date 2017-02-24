require 'test_helper'

class Providers::SyncControllerTest < ActionDispatch::IntegrationTest
  test 'admin can create new sync job' do
    headers = authorize users(:admin)
    provider = providers :cloud_forms
    assert_enqueued_jobs 1 do
      post provider_sync_url(provider), headers: headers
      assert_response :success
    end
  end

  test 'user cannot create new sync job' do
    headers = authorize users(:user)
    provider = providers :cloud_forms
    post provider_sync_url(provider), headers: headers
    assert_response :forbidden
  end
end
