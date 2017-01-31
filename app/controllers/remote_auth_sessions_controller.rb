class RemoteAuthSessionsController < ActionController::Base
  include ApplicationHelper
  include Authentication
  include ErrorHandling
  include Goby::Controller

  attr_reader :current_user

  before_action :authenticate, only: [:destroy]

  def create
    handle RemoteAuthSession::Create do |success|
      @current_user = success.model
      @token = success.model.session.token
      return render 'client/index', layout: 'client'
    end
  end

  def destroy
    handle RemoteAuthSession::Destroy do
      # noop
    end
  end

  private

  # This is where the magic happens to include headers filled in by apache into the params
  # We are currently assuming remote_user or the unique SAML user is the email address and
  # the lookup for our user model
  def create_params
    HashWithIndifferentAccess.new(
      remote_user: request.env['HTTP_X_REMOTE_USER'],
      name: request.env['HTTP_X_REMOTE_USER_FULLNAME'],
      remote_ip: request.remote_ip,
      user_agent: request.user_agent
    )
  end
end
