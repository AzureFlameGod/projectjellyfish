require 'test_helper'

class ProviderDataControllerTest < ActionDispatch::IntegrationTest
  test 'should get list of available provider data' do
    headers = authorize users(:user)
    get provider_data_index_url, headers: headers

    assert_response :success
    assert_equal 2, json_body[:data].length
  end

  test 'should get list of un-available provider data' do
    headers = authorize users(:user)
    get provider_data_index_url, headers: headers, params: { filter: { available: false } }

    assert_response :success
    assert_equal 1, json_body[:data].length
  end

end
