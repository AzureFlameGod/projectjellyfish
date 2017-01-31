class ProjectRequestMailer < ApplicationMailer
  def needs_approval(project_request)
    # Create BCC list of approvers
    bcc_list = User.where(role: :manager).pluck :email

    @project_request = project_request

    mail subject: 'New project request needing approval', bcc: bcc_list
  end

  def approved(project_request)

  end

  def denied(project_request)

  end
end
