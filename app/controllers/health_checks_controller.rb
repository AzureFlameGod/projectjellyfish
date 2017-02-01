class HealthChecksController < ApplicationController
  skip_before_action :authenticate

  def show
    AppSetting.current

    head :ok
  end
end
