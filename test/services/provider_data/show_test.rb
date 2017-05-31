require 'test_helper'

class ProviderData::ShowTest < ActiveSupport::TestCase
  setup do

  end

  test 'provider data' do
    user = users :user

    provider_data = provider_data(:one)
    result = ProviderData::Show.run context: user, params: {id: provider_data.id }
    assert_equal provider_data.name, result.model.name
  end

end
