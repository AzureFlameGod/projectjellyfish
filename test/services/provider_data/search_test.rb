require 'test_helper'

class ProviderData::SearchTest < ActiveSupport::TestCase
  setup do

  end

  test 'active provider data' do
    admin = users :admin

    result = ProviderData::Search.run context: admin, params: {}
    assert_equal 2, result.model.count
  end

  test 'inactive provider data' do
    admin = users :admin

    result = ProviderData::Search.run context: admin, params: { filter: [{ available: false }] }
    assert_equal 1, result.model.count
  end

end
