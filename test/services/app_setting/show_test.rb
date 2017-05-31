require 'test_helper'

class AppSetting::ShowTest < ActiveSupport::TestCase
  test 'should show app setting' do
    result = AppSetting::Show.run context: users(:user), params: {}
    assert result.valid?
  end
end
