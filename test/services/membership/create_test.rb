require 'test_helper'

class Membership::CreateTest < ActiveSupport::TestCase
  setup do
    @admin = users :admin
    @user = users :user
    @project = projects(:delta)
    @params = { data: { type: 'memberships', attributes: { user_id: @user.id, project_id: @project.id } } }
  end

  test 'should create a membership' do
    assert_empty Membership.where(user_id: user.id, project_id: project.id)
    result = Membership::Create.run(context: @admin, params: @params)

    assert result.valid?
    assert_equal 1, Membership.where(user_id: @user.id, project_id: @project.id).count
  end

  test 'non-managers cannot create membership' do
    assert_raises Goby::Service::NotAuthorizedError do
      Membership::Create.run(context: @user, params: @params)
    end
  end

end
