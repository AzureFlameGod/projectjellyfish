require 'test_helper'

class CloudForms::Provider::UpdateTest < ActiveSupport::TestCase
  test 'should set credentials' do
    user = users :admin
    provider = providers :cloud_forms

    context = user
    credentials = { host: 'http://updated', username: 'updated', password: 'updated' }
    attributes = { name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { id: provider.id, data: { type: 'providers', attributes: attributes } }
    result = Provider::Update.run(context: context, params: params)

    assert_equal true, result.valid?
    provider.reload
    assert_equal 'updated', provider.password
    assert_equal 'updated', provider.username
    assert_equal 'http://updated', provider.host
  end

  test 'should require host credentials' do
    user = users :admin
    provider = providers :cloud_forms

    context = user
    credentials = { host: 'http://updated', username: 'updated', password: 'updated' }
    credentials.delete :host
    attributes = { name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { id: provider.id, data: { type: 'providers', attributes: attributes } }
    result = Provider::Update.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'VALIDATION_ERROR', error.code
    assert_equal '`/data/attributes/credentials/host` is missing', error.detail
  end

  test 'should require username credentials' do
    user = users :admin
    provider = providers :cloud_forms

    context = user
    credentials = { host: 'http://updated', username: 'updated', password: 'updated' }
    credentials.delete :username
    attributes = { name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { id: provider.id, data: { type: 'providers', attributes: attributes } }
    result = Provider::Update.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'VALIDATION_ERROR', error.code
    assert_equal '`/data/attributes/credentials/username` is missing', error.detail
  end

  test 'should not require password credentials' do
    user = users :admin
    provider = providers :cloud_forms

    old_password = provider.password

    context = user
    credentials = { host: 'http://updated', username: 'updated', password: 'updated' }
    credentials.delete :password
    attributes = { name: 'Test Provider', description: 'Test description', credentials: credentials, tag_list: %w(one two) }
    params = { id: provider.id, data: { type: 'providers', attributes: attributes } }
    result = Provider::Update.run(context: context, params: params)

    assert_equal true, result.valid?
    provider.reload
    assert_equal old_password, provider.password
  end
end
