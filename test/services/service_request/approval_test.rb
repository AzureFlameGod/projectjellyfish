require 'test_helper'

class ServiceRequest::ApprovalTest < ActiveSupport::TestCase
  setup do
    @params = { service_request_id: service_requests(:ordered).id,
      data: {
        type: 'service_request/approvals',
        attributes: {
          approval: 'approve',
        }
      }
    }
  end

  test 'manager can approve service_request and creates service' do
    request = nil

    assert_difference 'Service.count', 1 do
      perform_enqueued_jobs do
        assert_enqueued_jobs 1 do
          request = ServiceRequest::Approval::Create.run context: users(:manager), params: @params
          assert request.valid?
        end
      end
    end
    assert request.model.approved?
  end
end
