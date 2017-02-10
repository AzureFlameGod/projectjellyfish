class ProviderMailer < ApplicationMailer

  def disconnected(provider)
    @provider = provider
    bcc_list = User.where(role: :admin).pluck(:email)
    mail to: bcc_list, subject: default_i18n_subject(
      provider_type: @provider.type.deconstantize, name: @provider.name)
  end

end
