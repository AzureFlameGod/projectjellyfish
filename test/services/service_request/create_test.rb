require 'test_helper'

class ServiceRequest::CreateTest < ActiveSupport::TestCase
  setup do
    @project_id = projects(:delta).id
    @product_id = products(:zzz).id
    @params = {
        data: {
            type: 'service_requests',
            attributes: {
                product_id: @product_id,
                project_id: @project_id
            }
        }
    }
  end

  test 'should create a new service request as a member of the project' do
    user = users :admin
    assert Membership.where(user_id: user.id, project_id: @project_id).exists?
    
    result = ServiceRequest::Create.run(context: user, params: @params)

    assert result.valid?
  end
  
  test 'cannot create a new service request when not a member of the project' do
    user = users :manager
    assert_not Membership.where(user_id: user.id, project_id: @project_id).exists?
    
    result = ServiceRequest::Create.run(context: user, params: @params)

    assert_not result.valid?
  end
  
end
