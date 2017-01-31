require 'test_helper'

class ServiceOrder::CreateTest < ActiveSupport::TestCase
  setup do
    @user = users :admin
    configured = service_requests(:configured)
    configured2 = service_requests(:configured2)
    @product = configured.product

    @params = {
      data: {
        type: 'service_orders',
        attributes: {
          request_message: 'A new order.'
        },
        relationships: {
          service_requests: {
            data: [
              { type: 'service_requests', id: configured2.id },
              { type: 'service_requests', id: configured.id }
            ]
          }
        }
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

  test 'should require service requests' do
    context = @user

    @params[:data][:relationships].delete :service_requests

    result = ServiceOrder::Create.run(context: context, params: @params)

    refute result.valid?
    message = '`/data/relationships/service_requests` is missing'
    assert_equal message, result.errors.first.detail
    assert_equal 0, ServiceOrder.count
  end

  test 'should require valid service requests' do
    context = @user

    @params[:data][:relationships][:service_requests][:data][0] = ['service_requests', SecureRandom.uuid]

    result = ServiceOrder::Create.run(context: context, params: @params)

    refute result.valid?
    message = '`/data/relationships/service_requests/data/0` must be a hash'
    assert_equal message, result.errors.first.detail
    assert_equal 0, ServiceOrder.count

    @params[:data][:relationships][:service_requests][:data][0] = { type: 'wrong', id: SecureRandom.uuid }

    result = ServiceOrder::Create.run(context: context, params: @params)

    refute result.valid?
    message = '`/data/relationships/service_requests/data/0/type` must be equal to service_requests'
    assert_equal message, result.errors.first.detail
    assert_equal 0, ServiceOrder.count
  end

  test 'should require existing service requests' do
    context = @user

    @params[:data][:relationships][:service_requests][:data].first[:id] = SecureRandom.uuid

    result = ServiceOrder::Create.run(context: context, params: @params)

    refute result.valid?
    message = '`/data/relationships/service_requests/data/0` is not a valid object identifier'
    assert_equal message, result.errors.first.detail
    assert_equal 0, ServiceOrder.count
  end
end
