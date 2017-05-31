require 'test_helper'

class Provider::CreateTest < ActiveSupport::TestCase
  test 'should create a provider' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal true, result.valid?
    provider = Provider.find result.model.id
    assert_equal CloudForms::Provider, provider.class
    assert_equal 'CloudForms::Provider', provider.type
    assert_equal 'Test Provider', provider.name
    assert_equal 'Test description', provider.description
    assert_equal %w(one two), provider.tag_list
  end

  test 'should not create a provider with an invalid provider type' do
    user = users :admin

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: SecureRandom.uuid, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Record Not Found', error.title
    assert_equal '/data/attributes/provider_type_id', error.source[:pointer]
  end

  test 'should deny non-admins' do
    user = users :manager
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    assert_raises Goby::Service::NotAuthorizedError do
      Provider::Create.run(context: context, params: params)
    end
  end


  test 'should require a name' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    attributes.delete :name
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Validation Error', error.title
    assert_equal '/data/attributes/name', error.source[:pointer]
  end

  test 'should require credentials' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    attributes.delete :credentials
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Validation Error', error.title
    assert_equal '/data/attributes/credentials', error.source[:pointer]
  end

  test 'should require credentials to be a hash' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = ['wrong']
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Validation Error', error.title
    assert_equal '/data/attributes/credentials', error.source[:pointer]
  end


  test 'should allow description to be optional' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    attributes.delete :description
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal true, result.valid?
  end

  test 'should require description to be a string' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: { wrong: 'wrong' }, credentials: credentials, tag_list: %w(one two) }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Validation Error', error.title
    assert_equal '/data/attributes/description', error.source[:pointer]
  end

  test 'should require tag_list to be an array' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: 'wrong' }
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'Validation Error', error.title
    assert_equal '/data/attributes/tag_list', error.source[:pointer]
  end

  test 'should allow tag_list to be optional' do
    user = users :admin
    provider_type = provider_types :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { provider_type_id: provider_type.id, name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    attributes.delete :tag_list
    params = { data: { type: 'providers', attributes: attributes } }
    result = Provider::Create.run(context: context, params: params)

    assert_equal true, result.valid?
  end
end
