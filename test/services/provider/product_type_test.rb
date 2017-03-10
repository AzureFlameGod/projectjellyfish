require 'test_helper'

class Provider::ProductTypeTest < ActiveSupport::TestCase
  setup do
    @provider = providers(:cloud_forms)
  end

  test 'product type search by manager' do
    result = Provider::ProductTypes::Search.run context: users(:manager), params: { provider_id: @provider.id }
    assert_equal Provider.where(provider_type_id: @provider.provider_type_id).count, result.model.count
  end

  test 'product type search by admin' do
    result = Provider::ProductTypes::Search.run context: users(:admin), params: { provider_id: @provider.id }
    assert_equal Provider.where(provider_type_id: @provider.provider_type_id).count, result.model.count
  end

  test 'product type search by user' do
    assert_raises Goby::Service::NotAuthorizedError do
      result = Provider::ProductTypes::Search.run context: users(:user), params: { provider_id: @provider.id }
    end
  end

end
