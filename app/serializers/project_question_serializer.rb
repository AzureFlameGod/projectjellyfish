class ProjectQuestionSerializer < ApplicationSerializer
  attributes :label, :answers, :required, :created_at, :updated_at
end
