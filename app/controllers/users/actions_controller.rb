module Users
  class ActionsController < ApplicationController
    service_class User::Action
    resource_class User
  end
end
