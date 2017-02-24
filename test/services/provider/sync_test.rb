require 'test_helper'

class Provider::SyncTest < ActiveSupport::TestCase
  test 'admin can provider sync service' do
    assert_enqueued_jobs 1 do
      Provider::Sync::Create.run context: users(:admin), params: { provider_id: providers(:cloud_forms).id }
    end
  end

  test 'user can provider sync service' do
    assert_raises Goby::Service::NotAuthorizedError do
      Provider::Sync::Create.run context: users(:user), params: { provider_id: providers(:cloud_forms).id }
    end
  end
end
