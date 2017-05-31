module Authentication
  include ActionController::HttpAuthentication::Token::ControllerMethods

  private

  def authenticate
    @current_user ||= authenticate_or_request_with_http_token do |token, _options|
      payload, _header = Session.parse_token token
      id, session_token = payload['sub'].split ':'
      User.find_by! id: id, session_token: session_token
    end
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    request_http_token_authentication
  end
end
