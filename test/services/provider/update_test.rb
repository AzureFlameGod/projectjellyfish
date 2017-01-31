require 'test_helper'

class Provider::UpdateTest < ActiveSupport::TestCase
  test 'should update a provider' do
    user = users :admin
    provider = providers :cloud_forms

    context = user
    credentials = { host: 'http://test', username: 'username', password: 'password' }
    attributes = { type: 'cloud_forms', name: 'Updated Provider', description: 'Updated description', credentials: credentials, tag_list: %w(one two three four) }
    params = { id: provider.id, data: { type: 'providers', attributes: attributes } }
    result = Provider::Update.run(context: context, params: params)

    assert_equal true, result.valid?
    provider.reload
    assert_equal CloudForms::Provider, provider.class
    assert_equal 'CloudForms::Provider', provider.type
    assert_equal 'Updated Provider', provider.name
    assert_equal 'Updated description', provider.description
    assert_equal %w(one two three four), provider.tag_list
  end
end
