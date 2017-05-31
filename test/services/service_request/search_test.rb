require 'test_helper'

class ServiceRequest::SearchTest < ActiveSupport::TestCase
  setup do
  end

  test 'show allowed service_requests' do
    user = users(:user)
    result = ServiceRequest::Search.new context: user, params: {}
    assert result.valid?

    assert_equal ServiceRequest.where(user_id: user.id).count, result.model.size
  end

  test 'admin can see all service_requests' do
    result = ServiceRequest::Search.new context: users(:admin), params: {}
    assert result.valid?

    assert_equal ServiceRequest.count, result.model.size
  end

end
