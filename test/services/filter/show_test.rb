require 'test_helper'

class Filter::ShowTest < ActiveSupport::TestCase
  setup do
  end

  test 'show filters' do
    result = Filter::Show.run context: users(:user), params: { id: filters(:project) }
    assert result.valid?
    assert_equal filters(:project).id, result.model.id
  end

end
