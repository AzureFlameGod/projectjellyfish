require 'test_helper'

class ServiceOrder::CreateTest < ActiveSupport::TestCase
  setup do
    @user = users :admin
    @product = service_requests(:configured).product

    @params = {
      data: {
        type: 'service_orders',
      }
    }
  end

  test 'should create a new service order' do
    context = @user

    result = ServiceOrder::Create.run(context: context, params: @params)

    assert result.valid?
    service_order = ServiceOrder.find result.model.id

    # assert_enqueued_jobs 1, only: ServiceOrder::ProcessJob
    assert_equal @user.id, service_order.user_id
    assert_equal 'pending', service_order.status
    assert_equal 2, service_order.service_requests.length
    assert_equal @product.setup_price * 2, service_order.setup_total
    assert_equal @product.monthly_cost * 2, service_order.monthly_total
  end

  test 'does not create service order without service requests' do
    context = @user

    # service_requests are not passed in params, they are loaded from the DB
    ServiceRequest.delete_all
    result = ServiceOrder::Create.run(context: context, params: @params)

    assert_equal 0, ServiceOrder.count
  end

end
