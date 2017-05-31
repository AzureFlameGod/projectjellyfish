module Services
  class ActionsController < ApplicationController
    service_class Service::Action
    resource_class Service
  end
end
