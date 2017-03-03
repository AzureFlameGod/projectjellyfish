class ApplicationJob < ActiveJob::Base
  include ActiveJobRetriesCount

  # HACK: Time to allow new and changed records to be written to the database before trying a job
  # use with `.set` like this `SomeJob.set(wait: ApplicationJob::WAIT).perform_later params`
  WAIT = 5.seconds.freeze

  queue_as :default
end
