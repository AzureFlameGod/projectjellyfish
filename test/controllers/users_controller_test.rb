require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @params = {
      data: {
        type: 'users',
        attributes: {
          name: 'Create Me',
          email: 'create@me.com',
          password: 'password',
          password_confirmation: 'password'
        }
      }
    }
  end

  test 'should get the current user' do
    headers = authorize users(:user)

    get users_url, headers: headers

    assert_response :success
  end

  test 'should create a new user' do
    post users_url, params: @params, headers: headers

    assert_response :success
  end
end
