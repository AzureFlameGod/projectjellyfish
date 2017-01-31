class ApplicationMailer < ActionMailer::Base
  layout 'mailer'

  before_action :setup_mailer

  def setup_mailer
    settings = AppSetting.current

    # Set the default sender; Change as needed in each mailer method
    mail.from = settings.mail_sender

    # Should be little need to override any of these settings in the mailer methods
    mail.delivery_method.settings.merge!({
      address:             settings.mail_host,
      port:                settings.mail_port,
      user_name:           settings.mail_username,
      password:            settings.mail_password,
      authentication:      settings.mail_authentication,
      openssl_verify_mode: settings.mail_ssl_verify
    })
  end
end
