require 'test_helper'

class SearchTest < ActiveSupport::TestCase
  setup do

  end

  test 'manager can view all service orders' do
    result = ServiceOrder::Search.run context: users(:manager), params: {}
    assert result.valid?
    assert_equal 2, result.model.count
  end

  test 'admin can view all service orders' do
    result = ServiceOrder::Search.run context: users(:admin), params: {}
    assert result.valid?
    assert_equal 2, result.model.count
  end


  test 'user can view their service orders' do
    result = ServiceOrder::Search.run context: users(:user), params: {}
    assert result.valid?
    assert_equal 1, result.model.count
  end

end
