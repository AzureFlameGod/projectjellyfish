require 'test_helper'

class Filter::ShowTest < ActiveSupport::TestCase
  setup do
  end

  test 'show filters' do
    filter = filters(:project)
    result = Filter::Show.run context: users(:user), params: { id: filter.id }
    assert result.valid?
    assert_equal filter.created_at, result.model.created_at
  end

end
