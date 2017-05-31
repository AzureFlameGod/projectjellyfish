require 'test_helper'

class RemoteAuthSessionsControllerTest < ActionDispatch::IntegrationTest
  test 'authenticate from remote user params' do
    name = 'random user'
    assert_nil User.find_by name: name

    post(remote_auth_sessions_path,
      headers: {
        'HTTP_X_REMOTE_USER_FULLNAME' => name,
        'HTTP_X_REMOTE_USER' => 'remote@remote.com',
        'HTTP_USER_AGENT' => 'something' },
      params: {})

    Rails.logger.info @response.inspect
    assert_response :success
    assert User.find_by name: name
  end

end
