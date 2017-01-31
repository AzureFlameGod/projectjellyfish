require 'test_helper'

class ServiceRequest::UpdateTest < ActiveSupport::TestCase

  test 'update a service request' do
    service_request = service_requests(:pending)
    product = products(:cloud_forms_automation)
    project = projects(:delta)
    new_service_name = "updated name"
    params = { id: service_request.id,
               data: {
                   type: "service_requests",
                   attributes: { service_name: new_service_name,
                                 type: "cloud_forms/automation/service_request",
                                 settings: {},
                   }
               }
    }

    sr = ServiceRequest::Update.new(context: users(:admin), params: params)
    assert_not_equal sr.model.service_name, new_service_name
    sr.perform
    assert_equal sr.model.service_name, new_service_name
  end

  test 'update a configured service request' do
    service_request = service_requests(:configured)
    product = products(:cloud_forms_automation)
    project = projects(:delta)
    new_service_name = "updated name"
    params = { id: service_request.id,
               data: {
                   type: "service_requests",
                   attributes: { service_name: new_service_name,
                                 type: "cloud_forms/automation/service_request",
                                 settings: {},
                   }
               }
    }

    sr = ServiceRequest::Update.new(context: users(:admin), params: params)
    assert_not_equal sr.model.service_name, new_service_name
    sr.perform
    assert_equal sr.model.service_name, new_service_name

  end
end
