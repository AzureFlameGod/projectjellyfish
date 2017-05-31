require 'test_helper'

class Provider::ValidateCredentialsTest < ActiveSupport::TestCase
  setup do
    stub_request(:get, 'http://test/api')
      .with(basic_auth: %w(username password))
      .to_return(body: mock_json('manageiq_api'))

    stub_request(:get, 'http://test/api')
      .with(basic_auth: %w(username wrong))
      .to_return(status: 401, body: mock_json('manageiq_401'))
  end

  test 'should validate credentials of new providers' do
    user = users :admin

    provider_count = Provider.count
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = CredentialValidation::Create.run(context: context, params: params)

    assert_equal true, result.valid?
    assert_equal provider_count, Provider.count
  end

  test 'should not validate credentials with an invalid provider type' do
    user = users :admin

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: SecureRandom.uuid, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = CredentialValidation::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'RECORD_NOT_FOUND', error.code
    assert_equal '/data/attributes/provider_type_id', error.source[:pointer]
  end

  test 'should validate credentials of existing providers' do
    user = users :admin
    provider_type = provider_types :cloud_forms
    provider = providers :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username' }
    attributes = { provider_type_id: provider_type.id, name: 'Updated Provider', description: 'Updated description', credentials: credentials, tag_list: %w(one two three four) }
    params = { data: { id: provider.id, type: 'providers', attributes: attributes } }
    result = CredentialValidation::Create.run(context: context, params: params)

    assert_equal true, result.valid?
    provider.reload
    assert_equal 'OK', result.model.message
  end

  test 'should deny bad credentials with new providers' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'wrong' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = CredentialValidation::Create.run(context: context, params: params)

    assert_equal true, result.valid?
    assert_equal false, result.model.valid
    assert_equal 'Authentication failed', result.model.message
  end

  test 'should deny bad credentials for existing providers' do
    user = users :admin
    provider_type = provider_types :cloud_forms
    provider = providers :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'wrong' }
    attributes = { provider_type_id: provider_type.id, name: 'Updated Provider', description: 'Updated description', credentials: credentials, tag_list: %w(one two three four) }
    params = { data: { id: provider.id, type: 'providers', attributes: attributes } }
    result = CredentialValidation::Create.run(context: context, params: params)

    assert_equal true, result.valid?
    assert_equal false, result.model.valid
    assert_equal 'Authentication failed', result.model.message
  end
end
