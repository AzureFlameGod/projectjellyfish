class ActiveSupport::TestCase
  include ActiveJob::TestHelper

  teardown do
    Sidekiq::Worker.clear_all
  end
end
