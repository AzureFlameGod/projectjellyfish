class UserMailer < ApplicationMailer

  def registration(user)
    mail to: user.email
  end

  def approval(user)
    @user = user

    mail to: @user.email
  end

  def welcome(user)
    @user = user

    mail to: @user.email
  end

end
