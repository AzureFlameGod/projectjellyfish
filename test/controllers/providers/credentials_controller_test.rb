require 'test_helper'

class Providers::CredentialsControllerTest < ActionDispatch::IntegrationTest
  setup do
    stub_request(:get, 'http://test/api')
      .with(basic_auth: %w(username password))
      .to_return(body: mock_json('manageiq_api'))

    stub_request(:get, 'http://test/api')
      .with(basic_auth: %w(username wrong))
      .to_return(status: 401, body: mock_json('manageiq_401'))
  end

  test 'should validate credentials for new providers' do
    headers = authorize users(:admin)

    provider_type = provider_types :cloud_forms

    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    post providers_credentials_url, headers: headers, params: params.deep_stringify_keys

    assert_response :success
    assert_equal true, json_body[:data][:attributes][:valid]
    assert_equal 'OK', json_body[:data][:attributes][:message]
  end

  test 'should validate credentials for existing providers' do
    headers = authorize users(:admin)

    provider_type = provider_types :cloud_forms
    provider = providers :cloud_forms

    credentials = { host: 'http://test', username: 'username' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { id: provider.id, type: 'providers', attributes: attributes } }
    post providers_credentials_url, headers: headers, params: params.deep_stringify_keys

    assert_response :success
    assert_equal true, json_body[:data][:attributes][:valid]
    assert_equal 'OK', json_body[:data][:attributes][:message]
  end

  test 'should deny bad credentials with new providers' do
    headers = authorize users(:admin)

    provider_type = provider_types :cloud_forms

    credentials = { host: 'http://test', username: 'username', password: 'wrong' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    post providers_credentials_url, headers: headers, params: params.deep_stringify_keys

    assert_response :success
    assert_equal false, json_body[:data][:attributes][:valid]
    assert_equal 'Authentication failed', json_body[:data][:attributes][:message]
  end

  test 'should deny bad credentials for existing providers' do
    headers = authorize users(:admin)

    provider_type = provider_types :cloud_forms
    provider = providers :cloud_forms

    credentials = { host: 'http://test', username: 'username', password: 'wrong' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { id: provider.id, type: 'providers', attributes: attributes } }
    post providers_credentials_url, headers: headers, params: params.deep_stringify_keys

    assert_response :success
    assert_equal false, json_body[:data][:attributes][:valid]
    assert_equal 'Authentication failed', json_body[:data][:attributes][:message]
  end
end
