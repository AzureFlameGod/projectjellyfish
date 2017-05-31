require 'test_helper'

class ProjectQuestion::CreateTest < ActiveSupport::TestCase

  test 'update project question' do
    label = 'abcd abcd'
    project_question = project_questions(:fisma)
    result = ProjectQuestion::Update.run context: users(:manager), params: {
      id: project_question.id,
      data: {
        type: 'project_questions',
        attributes:
          { label: label,
            required: project_question.required,
            answers: project_question.answers
          }
      }
    }

    assert result.valid?
    assert_equal label, result.model.label
  end

end
