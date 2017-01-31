require 'simplecov'
SimpleCov.start 'rails' do
  add_group 'Policies', 'app/policies'
  add_group 'Serializers', 'app/serializers'
  add_group 'Services', 'app/services'
  groups.delete 'Helpers'
end unless ENV['NO_COVERAGE']

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

# Avoid
require 'sidekiq/testing'
Sidekiq::Testing.fake!

# Test those external dependencies
require 'webmock/minitest'

# Improved Minitest output (color and progress bar)
require "minitest/reporters"
Minitest::Reporters.use!(Minitest::Reporters::SpecReporter.new, ENV, Minitest.backtrace_filter)

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

# See: https://gist.github.com/mperham/3049152
class ActiveRecord::Base
  mattr_accessor :shared_connection
  @@shared_connection = nil

  def self.connection
    @@shared_connection || ConnectionPool::Wrapper.new(:size => 1) { retrieve_connection }
  end
end
ActiveRecord::Base.shared_connection = ActiveRecord::Base.connection

require 'support/integration_helpers'
require 'support/json_responses'
require 'support/sidekiq'
