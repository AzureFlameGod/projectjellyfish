require 'test_helper'

class ShowTest < ActiveSupport::TestCase
  setup do
    @service_order = service_orders(:pending)
  end

  test "cannot view service order if don't own it" do
    assert_raises Goby::Service::NotAuthorizedError do
      ServiceOrder::Show.run context: users(:another_user), params: { id: @service_order.id }
    end
  end

  test 'can view service order if own it' do
    result = ServiceOrder::Show.run context: users(:user), params: { id: @service_order.id }
    assert result.valid?
    assert_equal result.model.id, @service_order.id
    assert_equal 3, result.model.service_requests.count
  end

  test 'admin can view service orders' do
    result = ServiceOrder::Show.run context: users(:admin), params: { id: @service_order.id }
    assert result.valid?
    assert_equal result.model.id, @service_order.id
  end

  test 'manager can view service orders' do
    result = ServiceOrder::Show.run context: users(:manager), params: { id: @service_order.id }
    assert result.valid?
    assert_equal result.model.id, @service_order.id
  end

end
