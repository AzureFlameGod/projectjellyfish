require 'test_helper'

class ServiceRequest::ShowTest < ActiveSupport::TestCase
  setup do
  end

  test 'should not load service_request owned by another user' do
    assert_raises Goby::Service::NotAuthorizedError do
      ServiceRequest::Show.run context: users(:user), params: { id: service_requests(:configured).id }
    end
  end

  test 'should load service_request owned by self' do
    sr = service_requests(:user_owned)
    result = ServiceRequest::Show.run context: users(:user), params: { id: sr.id }
    assert result.valid?
    assert_equal sr.id, result.model.id
  end

  test 'admin can load service_requests' do
    sr = service_requests(:user_owned)
    result = ServiceRequest::Show.run context: users(:admin), params: { id: sr.id }
    assert result.valid?
    assert_equal sr.id, result.model.id
  end
end
