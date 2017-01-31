class ActionDispatch::IntegrationTest
  def authorize(user = users(:user))
    post sessions_url, headers: { 'User-Agent' => 'Test' }, 
         params: { data: { type: 'sessions', attributes: { email: user.email, password: user.role } } }

    return {} unless response.status == 200

    { 'Authorization' => "Token #{response.headers['Authorization']}" }
  end

  def json_body
    (@json_body ||= {})[request.object_id] ||= JSON(body).deep_symbolize_keys
  end
end
