class ProjectQuestion < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ProjectQuestion, :find
    policy ProjectQuestionPolicy
  end
end
