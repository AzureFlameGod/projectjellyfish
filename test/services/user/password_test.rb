require 'test_helper'

class PasswordTest < ActiveSupport::TestCase
  setup do
    manager = users(:manager)
    @new_password = 'new password'
    @params = {
      user_id: manager.id,
      data: {
        type: 'user/passwords',
        attributes: {
          password: @new_password,
          password_confirmation: @new_password
        }
      }
    }
  end

  test 'update own password' do
    manager = users(:manager)
    result = User::Password::Update.run context: manager, params: @params
    assert result.valid?
    manager.reload
    assert manager.authenticate(@new_password)
  end

  test 'update another users password without permission' do
    assert_raises Goby::Service::NotAuthorizedError do
      User::Password::Update.run context: users(:user), params: @params
    end
  end

  test 'admins can update another users password' do
    result = User::Password::Update.run context: users(:admin), params: @params
    assert result.valid?
    manager = users(:manager)
    manager.reload
    assert manager.authenticate(@new_password)

  end
end
