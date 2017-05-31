class Project < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model Project, :find
    policy ProjectPolicy, :show?
  end
end
