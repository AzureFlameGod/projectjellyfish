require 'test_helper'

class ProjectQuestion::ShowTest < ActiveSupport::TestCase

  test 'show project question' do
    project_question = project_questions(:fisma)
    result = ProjectQuestion::Show.run context: users(:user), params: { id: project_question.id }
    assert_equal result.model.label, project_question.label
  end

end
