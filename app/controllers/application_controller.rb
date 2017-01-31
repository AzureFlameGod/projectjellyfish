class ApplicationController < ActionController::API
  include ApplicationHelper
  include Authentication
  include ErrorHandling
  include Goby::Controller

  before_action :authenticate

  attr_reader :current_user

  private

  def base_url
    super + '/api'
  end
end
