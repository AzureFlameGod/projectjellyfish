require 'test_helper'

class PolicyTests < ActiveSupport::TestCase
  test 'app settings policy test' do
    refute AppSettingPolicy.new(users(:user), nil).update?
    assert AppSettingPolicy.new(users(:user), nil).show?
  end

  test 'cart policies' do
    assert CartPolicy.new(users(:user), nil).search?
  end
end
