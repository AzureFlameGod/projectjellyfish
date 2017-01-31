class ProjectQuestion < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model ProjectQuestion, :collection
    policy ProjectQuestionPolicy
  end
end
