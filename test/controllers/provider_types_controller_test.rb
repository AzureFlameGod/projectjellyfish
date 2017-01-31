require 'test_helper'

class ProviderTypesControllerTest < ActionDispatch::IntegrationTest
  test 'should gets list of provider types' do
    headers = authorize users(:admin)
    get provider_types_url, headers: headers

    assert_response :success
  end

  test 'should not allow non-admins to get provider types' do
    headers = authorize users(:manager)
    get provider_types_url, headers: headers

    assert_response :forbidden
  end


  test 'should get a provider type' do
    headers = authorize users(:admin)
    provider_type = provider_types :cloud_forms

    get provider_type_url(id: provider_type.id), headers: headers

    assert_response :success
  end

  test 'should not allow non-admins to get a provider type' do
    headers = authorize users(:manager)
    provider_type = provider_types :cloud_forms

    get provider_type_url(id: provider_type.id), headers: headers

    assert_response :forbidden
  end
end
