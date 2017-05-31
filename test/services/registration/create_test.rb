require 'test_helper'

class Registration::CreateTest < ActionMailer::TestCase
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

  test 'email on register new user' do
    assert_emails 1 do

      perform_enqueued_jobs do
        Registration::Create.run context: nil, params: @params
      end
    end
  end
end
