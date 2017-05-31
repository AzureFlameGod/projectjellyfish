class PasswordsController < ApplicationController
  def create
    handle Password::ResetRequest do |success|
      render success.model
    end
  end

  def update
    handle Password::Reset do |success|
      render success.model
    end
  end
end
