require 'test_helper'

class ServiceRequestsControllerTest < ActionDispatch::IntegrationTest

  test 'create a service request' do
    headers = authorize users(:admin)
    params = {
      data: {
        type: "service_requests",
        attributes: { product_id: products(:cheap_setup).id, project_id: projects(:delta).id }
      }
    }
    post(service_requests_url, headers: headers, params: params.deep_stringify_keys)

    assert_response :success
  end

  test 'configure a service request in cart' do
    skip("Not currently working")
    headers = authorize users(:admin)

    service_request = service_requests(:pending)
    product = products(:cloud_forms_automation)
    project = projects(:delta)
    params = { id: service_request.id,
      data: {
        type: "service_requests",
        attributes: { service_name: "updated name",
          type: "cloud_forms/automation/service_request",
          product_id: product.id,
          project_id: project.id,
          settings: {},
        }
      }
    }
    put(service_request_url(service_request.id,
      :include => 'product',
      'fields[products]' => 'type,name,description,setup_price,hourly_price,monthly_price,monthly_cost'),
      headers: headers, params: params.deep_stringify_keys)
    assert_response :success

  end
end
