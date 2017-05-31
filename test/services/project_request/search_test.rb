require 'test_helper'

class ProjectRequest::SearchTest < ActiveSupport::TestCase
  test 'project request search' do
    result = ProjectRequest::Search.run context: users(:user), params: {}
    assert result.valid?
    assert_equal ProjectRequest.count, result.model.count
  end

end
