require 'test_helper'

class Project::UpdateTest < ActiveSupport::TestCase
  setup do
    @project = projects(:delta)
  end

  test 'project update' do
    new_name = 'new name'
    result = Project::Update.run context: users(:admin), params: {
      id: @project.id, data: {
        type: 'projects',
        attributes: {
          name: new_name,
          description: @project.description,
          budget: @project.budget.to_s
        }
      }
    }
    assert result.valid?
    assert_equal new_name, result.model.name
  end

  test 'manager can update project without being a member' do
    assert ProjectPolicy.new(users(:manager), @project).update?
    refute ProjectPolicy.new(users(:user), @project).update?
  end
end
