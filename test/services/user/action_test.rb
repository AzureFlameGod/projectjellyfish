require 'test_helper'

class ActionTest < ActiveSupport::TestCase
  setup do
    @approve_params = {
      user_id: users(:pending).id,
      data: {
        type: 'user/actions',
        attributes: {
          action: 'approve'
        }
      }
    }
  end

  test 'pending admin user should not be able to approve himself' do
    assert_raises Goby::Service::NotAuthorizedError do
      User::Action::Create.run context: users(:pending), params: @approve_params
    end
  end

  test 'manager cannot approve user' do
    assert_raises Goby::Service::NotAuthorizedError do
      result = User::Action::Create.run context: users(:manager), params: @approve_params
    end
  end

  test 'admin can approve user' do
    user = users(:pending)
    result = User::Action::Create.run context: users(:admin), params: @approve_params
    assert result.valid?
    user.reload
    assert 'active', user.state
  end

  test 'admin can disable user' do
    user = users(:user)
    result = User::Action::Create.run context: users(:admin), params: {
      user_id: user.id,
      data: {
        type: 'user/actions',
        attributes: {
          action: 'disable'
        }
      }
    }
    assert result.valid?
    user.reload
    assert 'disabled', user.state
  end

  test 'admin can enable user' do
    user = users(:disabled)
    result = User::Action::Create.run context: users(:admin), params: {
      user_id: user.id,
      data: {
        type: 'user/actions',
        attributes: {
          action: 'enable'
        }
      }
    }
    assert result.valid?
    user.reload
    assert 'enabled', user.state

  end

end
