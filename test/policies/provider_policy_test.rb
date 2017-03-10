require 'test_helper'

class ProviderPolicyTest < ActiveSupport::TestCase
  test 'managers and users have no permission to destroy or update a provider' do
    refute ProviderPolicy.new(users(:user), nil).destroy?
    refute ProviderPolicy.new(users(:manager), nil).destroy?
    refute ProviderPolicy.new(users(:user), nil).update?
    refute ProviderPolicy.new(users(:manager), nil).update?
  end
end
