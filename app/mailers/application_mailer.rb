class ApplicationMailer < ActionMailer::Base
  layout 'mailer'

  before_action :setup_mailer
  # Set the default sender; Change as needed in each mailer method
  default from: Proc.new { AppSetting.current.mail_sender }

  def setup_mailer
    settings = AppSetting.current

    # Should be little need to override any of these settings in the mailer methods
    ActionMailer::Base.smtp_settings = {
      address:             settings.mail_host,
      port:                settings.mail_port,
      user_name:           settings.mail_username,
      password:            settings.mail_password,
      authentication:      settings.mail_authentication,
      openssl_verify_mode: settings.mail_ssl_verify
    }
  end
end
