require 'test_helper'

class ProjectQuestionsControllerTest < ActionDispatch::IntegrationTest
  test 'get project questions' do
    get project_questions_url, headers: authorize(users(:user))

    assert_response :success
    assert_equal ProjectQuestion.count, json_body[:data].count
  end

  test 'create project questions' do
    post project_questions_url, headers: authorize(users(:admin)), params: {
      data: {
        type: 'project_questions',
        attributes: {
          required: true,
          label: 'A label',
          answers: [{ label: 'answer label', require: %w(a b c), exclude: %w(something) }],
        }
      }
    }
    # Don't know why this is failing
    # {"errors":[{"code":"bool","title":"Validation Error","detail":"must be boolean",
    #  "source":{"pointer":"/data/attributes/required"}}]}

    Rails.logger.info response.body

    assert_response :success
  end

end
