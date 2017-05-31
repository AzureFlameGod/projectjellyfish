class ProjectRequest < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ProjectRequest, :find
    policy ProjectRequestPolicy, :show?
  end
end
