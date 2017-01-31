module Providers
  class ConnectionsController < ApplicationController
    service_class Provider::Connection
    resource_class Provider
  end
end
