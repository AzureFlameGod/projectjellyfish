require 'test_helper'

class User::UpdateTest < ActiveSupport::TestCase
  setup do
    @user = users(:manager)
    @updated_name = 'new name'
    @params = {
      id: @user.id,
      data: {
        type: 'users',
        attributes: {
          name: @updated_name,
          email: @user.email,
          role: @user.role
        }
      }
    }
  end

  test 'should update own user name' do
    user = User.find_by(name: @user.name)
    assert_equal @user.id, user.id

    result = User::Update.run(context: @user, params: @params)

    assert result.valid?
    user = User.find_by name: @updated_name
    assert_equal @user.id, user.id
  end

  test 'user should not be able to update manager' do

    assert_raises Goby::Service::NotAuthorizedError do
      User::Update.run(context: users(:user), params: @params)

    end
  end

  test 'user should not be able to change his own role' do
    params = @params.dup
    params[:data][:attributes][:role] = 'admin'
    result = User::Update.run(context: @user, params: params)

    refute result.valid?
  end

end
