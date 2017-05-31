module Providers
  class SyncsController < ApplicationController
    service_class Provider::Sync
    resource_class Provider
  end
end
