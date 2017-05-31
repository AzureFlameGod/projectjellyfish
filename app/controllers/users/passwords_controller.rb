module Users
  class PasswordsController < ApplicationController
    service_class User::Password
    resource_class User
  end
end
