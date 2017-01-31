class AccountInfosController < ApplicationController
  service_class User
  resource_class User

  def show
    handle User::Show do |success|
      response.headers['Authorization'] = success.model.session.token
      render_results success.model
    end
  end

  def show_params
    params.to_unsafe_hash.merge id: current_user.id
  end
end
