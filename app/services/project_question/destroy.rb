class ProjectQuestion < ApplicationRecord
  class Destroy < ApplicationService
    include Model
    include Policy

    model ProjectQuestion, :find
    policy ProjectQuestionPolicy

    def perform
      model.destroy
    end
  end
end
