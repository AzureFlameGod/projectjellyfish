require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test 'registration' do
    skip("Currently don't have user registration")
    mail = UserMailer.registration
    assert_equal 'Registration', mail.subject
    assert_equal ['to@example.org'], mail.to
    assert_equal @from, mail.from
    assert_match 'Hi', mail.body.encoded
  end

  test 'forgot_password' do
    skip("Currently don't have forgot password")
    mail = UserMailer.forgot_password
    assert_equal 'Forgot password', mail.subject
    assert_equal ['to@example.org'], mail.to
    assert_equal @from, mail.from
    assert_match 'Hi', mail.body.encoded
  end

  test 'new user registration via remote headers' do

    params = HashWithIndifferentAccess.new(
      remote_user: 'remoteuser@user.com',
      name: 'Test User',
      remote_ip: '10.0.0.1',
      user_agent: 'Browser string'
    )

    assert_emails 1 do
      perform_enqueued_jobs do
        RemoteAuthSession::Create.run context: nil, params: params
      end
    end
  end

  test 'existing user registration via remote headers' do
    user = users(:user)
    params = HashWithIndifferentAccess.new(
      remote_user: user.email,
      name: user.name,
      remote_ip: '10.0.0.1',
      user_agent: 'Browser string'
    )

    perform_enqueued_jobs do
      RemoteAuthSession::Create.run context: nil, params: params
    end

    assert_performed_jobs 0
  end


end
