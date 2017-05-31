class Service < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model Service, :collection
    policy ServicePolicy

    sort_by name: :asc
  end
end
