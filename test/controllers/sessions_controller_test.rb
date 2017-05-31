require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should login user' do
    authorize
    assert_response :success
  end

  test 'should login manager' do
    authorize users(:manager)
    assert_response :success
  end

  test 'should login admin' do
    authorize users(:admin)
    assert_response :success
  end

  test 'should not login pending users' do
    authorize users(:pending)
    assert_response :unprocessable_entity
  end
  
  test 'should not login disabled users' do
    authorize users(:disabled)
    assert_response :unprocessable_entity
  end
  
  test 'should destroy the session' do
    user = users :user
    headers = authorize user
    delete sessions_url, headers: headers
    assert_response :success
  end
end
