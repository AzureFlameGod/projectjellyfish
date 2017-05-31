require 'test_helper'
class ProviderMailerTest < ActionMailer::TestCase

  setup do
    stub_request(:get, "http://localhost:3002/api").
      to_return(:status => 401, :body => "", :headers => {})
  end

  test 'send disconnected email' do
    provider = providers(:cloud_forms)

    assert_emails 1 do
      perform_enqueued_jobs do
        Provider::CheckCredentials.run(context: nil, params: { id: provider.id })
      end
    end
    email = ActionMailer::Base.deliveries.last

    assert_equal [users(:admin).email], email.bcc

  end
end
