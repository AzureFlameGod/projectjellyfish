require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  setup do
    @from = %w(no-reply@projectjellyfish.org)
  end

  test 'registration' do
    mail = UserMailer.registration
    assert_equal 'Registration', mail.subject
    assert_equal ['to@example.org'], mail.to
    assert_equal @from, mail.from
    assert_match 'Hi', mail.body.encoded
  end

  test 'forgot_password' do
    mail = UserMailer.forgot_password
    assert_equal 'Forgot password', mail.subject
    assert_equal ['to@example.org'], mail.to
    assert_equal @from, mail.from
    assert_match 'Hi', mail.body.encoded
  end
end
