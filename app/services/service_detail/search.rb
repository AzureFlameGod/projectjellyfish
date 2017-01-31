class ServiceDetail < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model ServiceDetail, :collection
    policy ServiceDetailPolicy

    sort_by service_name: :asc
  end
end
