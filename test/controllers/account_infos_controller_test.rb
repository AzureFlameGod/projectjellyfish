require 'test_helper'

class AccountInfosControllerTest < ActionDispatch::IntegrationTest
  test 'should get current_user info' do
    headers = authorize users(:user)
    get account_info_url, headers: headers

    assert_response :success
  end
end
