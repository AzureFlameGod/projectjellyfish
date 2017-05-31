require 'test_helper'

class RemoteAuthSession::CreateTest < ActiveSupport::TestCase
  setup do
    @params = {
      name: "Some name",
      remote_ip: "127.0.0.1",
      user_agent: "A test"
    }
  end

  test 'create remote auth session for existing user' do
    result = RemoteAuthSession::Create.run context: nil, params: @params.merge(
      remote_user: users(:user).email
    )

    assert result.valid?
  end

  test 'create remote auth session for new user' do
    result = RemoteAuthSession::Create.run context: nil, params: @params.merge(
      remote_user: "test@test.com"
    )
    assert result.valid?
  end

  test 'cannot create remote auth session for pending (not active) user' do
    result = RemoteAuthSession::Create.run context: nil, params: @params.merge(
      remote_user: users(:pending).email
    )
    refute result.valid?
  end

  test 'cannot create remote auth session for disabled user' do
    result = RemoteAuthSession::Create.run context: nil, params: @params.merge(
      remote_user: users(:disabled).email
    )
    refute result.valid?
  end

end
