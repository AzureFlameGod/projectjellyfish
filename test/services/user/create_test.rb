require 'test_helper'

class User::CreateTest < ActiveSupport::TestCase
  setup do
    @params = {
      data: {
        type: 'users',
        attributes: {
          name: 'Create Me',
          email: 'create@me.com',
          password: 'password',
          password_confirmation: 'password',
          state: 'pending',
          role: 'user'
        }
      }
    }
  end

  test 'should create a new user' do
    result = User::Create.run(context: nil, params: @params)

    assert result.valid?
    user = User.find_by name: @params[:data][:attributes][:name]
    assert_equal user.id, result.model.id
  end

  test 'cannot create user with existing email' do
    params = @params.dup
    params[:data][:attributes][:email] = users(:user).email
    result = User::Create.run(context: nil, params: params)

    refute result.valid?
    error = result.errors[0]
    assert_equal "unique_email", error.code
    assert_equal "/data/attributes/email", error.source[:pointer]
  end
end
