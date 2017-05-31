class Project < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model Project, :collection
    policy ProjectPolicy

    sort_by name: :asc

    private

    def collection_model!
      policy_scope(super)
    end
  end
end
