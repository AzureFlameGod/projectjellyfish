class ServiceDetail < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ServiceDetail, :find
    policy ServiceDetailPolicy, :show?

    private

    def find_model!
      ServiceDetail.find_by! service_id: params[:id]
    end
  end
end
