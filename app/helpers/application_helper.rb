module ApplicationHelper
  def app_settings
    javascript_tag "var APP_SETTINGS = #{AppSettingSerializer.new(AppSetting.current).attributes.to_json};"
  end

  def authorization_token
    javascript_tag("var TOKEN = #{@token.to_json};") if @token
  end
end
