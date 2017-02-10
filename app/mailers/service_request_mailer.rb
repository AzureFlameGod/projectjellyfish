class ServiceRequestMailer < ApplicationMailer

  def admin_manager_notice(project, owner, service_request_count)
    @count = service_request_count
    @project = project
    @owner = owner
    @site_url = Rails.application.routes.url_helpers.root_url

    bcc_list = User.where(role: [:manager, :admin]).pluck(:email)

    mail bcc: bcc_list
  end

  def owner_notice(project, owner, service_request_count)
    @count = service_request_count
    @project = project
    @owner = owner

    mail to: @owner.email
  end

  def approval(service_request)
    @service_request = service_request
    @owner = service_request.user

    mail to: @owner.email, subject: default_i18n_subject(service_name: service_request.service_name)
  end

  def denial(service_request)
    @service_request = service_request
    @owner = service_request.user

    mail to: @owner.email, subject: default_i18n_subject(service_name: service_request.service_name)
  end
end
