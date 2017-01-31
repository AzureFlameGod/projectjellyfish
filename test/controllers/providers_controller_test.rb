require 'test_helper'

class ProvidersControllerTest < ActionDispatch::IntegrationTest
  test 'should gets list of providers' do
    headers = authorize users(:admin)
    get providers_url, headers: headers

    assert_response :success
  end

  test 'should get a provider' do
    headers = authorize users(:admin)
    provider = providers(:cloud_forms)

    get provider_url(id: provider.id), headers: headers

    assert_response :success
  end

  test 'should create a provider' do
    headers = authorize users(:admin)
    provider_type = provider_types :cloud_forms

    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    post providers_url, headers: headers, params: params.deep_stringify_keys

    assert_response :success
  end

  test 'should create a provider without optional attributes' do
    headers = authorize users(:admin)
    provider_type = provider_types :cloud_forms

    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', credentials: credentials }
    params = { data: { type: 'providers', attributes: attributes } }
    post providers_url, headers: headers, params: params.deep_stringify_keys

    assert_response :success
  end
end
