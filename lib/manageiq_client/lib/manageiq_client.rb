require 'manageiq_client/basic_request'
require 'manageiq_client/client'
require 'manageiq_client/collection'
require 'manageiq_client/connection'
require 'manageiq_client/error'
require 'manageiq_client/version'

module ManageIQClient
  HEADERS = { 'Content-Type' => 'application/json', 'Accept' => 'application/json' }.freeze
  BASE_PATH = '/api'.freeze
  READ_TIMEOUT = 180
  WRITE_TIMEOUT = 120
end
