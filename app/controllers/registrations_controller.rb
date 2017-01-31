class RegistrationsController < ApplicationController
  skip_before_action :authenticate, only: [:create]
end
