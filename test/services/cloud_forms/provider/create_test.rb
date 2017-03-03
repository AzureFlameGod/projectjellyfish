require 'test_helper'

class CloudForms::Provider::CreateTest < ActiveSupport::TestCase
  test 'should set credentials' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    provider = Provider.find result.model.id

    assert_equal true, result.valid?
    assert_equal 'http://test', provider.host
    assert_equal 'username', provider.username
    assert_equal 'password', provider.password
  end

  test 'should require host credentials' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    credentials.delete :host
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Validation Error', error.title
    assert_equal '/data/attributes/credentials/host', error.source[:pointer]
  end

  test 'should require username credentials' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    credentials.delete :username
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Validation Error', error.title
    assert_equal '/data/attributes/credentials/username', error.source[:pointer]
  end

  test 'should require password credentials' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    credentials.delete :password
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Validation Error', error.title
    assert_equal '/data/attributes/credentials/password', error.source[:pointer]
  end
end
