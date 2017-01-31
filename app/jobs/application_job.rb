class ApplicationJob < ActiveJob::Base
  include ActiveJobRetriesCount

  WAIT = 5.seconds.freeze

  queue_as :default
end
