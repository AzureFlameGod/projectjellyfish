require 'test_helper'

class ProjectQuestion::CreateTest < ActiveSupport::TestCase

  test 'create project question' do
    label = 'abcd abcd'
    result = ProjectQuestion::Create.run context: users(:manager), params: {
      data: {
        type: 'project_questions',
        attributes:
        { label: label,
          required: true,
          answers: [
            { label: 'first answer',
              require: %w(first second third),
              exclude: %w(fourth fifth sixth)
            }
          ]
        }
      }
    }

    assert result.valid?
    assert_equal label, result.model.label
  end

end
