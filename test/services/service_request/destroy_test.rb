require 'test_helper'

class ServiceRequest::DestroyTest < ActiveSupport::TestCase

  test 'admin cannot destroy approved service request' do
    assert_raises Goby::Service::NotAuthorizedError do
      ServiceRequest::Destroy.run context: users(:admin), params: { id: service_requests(:approved).id }
    end
  end

  test 'admin can destroy unapproved service request' do
    sr = service_requests(:configured)
    result = ServiceRequest::Destroy.run context: users(:admin), params: { id: sr.id }
    assert result.valid?
    assert_empty ServiceRequest.where(id: sr.id)
  end

  test 'user can destroy own service request' do
    sr = service_requests(:user_owned)
    result = ServiceRequest::Destroy.run context: sr.user, params: { id: sr.id }
    assert result.valid?
    assert_empty ServiceRequest.where(id: sr.id)
  end

  test 'user cannot destroy other users service requests' do
    assert_raises Goby::Service::NotAuthorizedError do
      ServiceRequest::Destroy.run context: users(:user), params: { id: service_requests(:configured).id }
    end
  end
end
