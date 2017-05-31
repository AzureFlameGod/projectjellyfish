require 'test_helper'

class PolicyTests < ActiveSupport::TestCase
  test 'app settings policy test' do
    refute AppSettingPolicy.new(users(:user), nil).update?
    assert AppSettingPolicy.new(users(:user), nil).show?
  end

  test 'cart policies' do
    assert CartPolicy.new(users(:user), nil).search?
  end

  test 'managers and users have no permission to destroy or update a provider' do
    refute ProviderPolicy.new(users(:user), nil).destroy?
    refute ProviderPolicy.new(users(:manager), nil).destroy?
    refute ProviderPolicy.new(users(:user), nil).update?
    refute ProviderPolicy.new(users(:manager), nil).update?
  end
end
