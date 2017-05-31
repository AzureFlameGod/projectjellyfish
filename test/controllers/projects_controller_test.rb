require 'test_helper'

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  test 'should gets list of projects' do
    headers = authorize users(:admin)
    get projects_url, headers: headers

    assert_response :success
  end

  test 'should get a project' do
    headers = authorize users(:admin)
    project = projects(:delta)

    get project_url(id: project.id), headers: headers

    assert_response :success
  end

  test 'should update a project' do
    headers = authorize users(:admin)
    project = projects(:delta)

    params = { id: project.id, data: { type: 'projects', attributes: { name: project.name, description: 'a new description' } } }
    post project_url(project), headers: headers, params: params.deep_stringify_keys

    assert_response :success
  end

end
