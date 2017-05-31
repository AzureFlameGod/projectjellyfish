class AppSetting < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model AppSetting, :find
    policy AppSettingPolicy

    private

    def find_model!
      AppSetting.current
    end
  end
end
