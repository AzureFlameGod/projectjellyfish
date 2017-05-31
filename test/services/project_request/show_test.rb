require 'test_helper'

class ProjectRequest::ShowTest < ActiveSupport::TestCase
  test 'project request show' do
    result = ProjectRequest::Show.run context: users(:user), params: { id: project_requests(:project_request).id }
    assert result.valid?
  end

  test 'other users cannot see project requests' do
    assert_raises Goby::Service::NotAuthorizedError do
      ProjectRequest::Show.run context: users(:another_user), params: { id: project_requests(:project_request).id }
    end
  end

end
