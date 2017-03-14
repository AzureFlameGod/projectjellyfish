require 'test_helper'

class ProjectQuestion::DestroyTest < ActiveSupport::TestCase

  test 'destroy project question' do
    project_question = project_questions(:fisma)
    result = ProjectQuestion::Destroy.run context: users(:manager), params: { id: project_question.id }
    assert result.valid?
    assert ProjectQuestion.where(id: project_question.id).none?
  end

end
