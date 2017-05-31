class ProjectQuestion < ApplicationRecord
  class Update < ApplicationService
    include Model
    include Policy
    include Sanitize

    model ProjectQuestion, :find
    policy ProjectQuestionPolicy

    sanitize do
      required(:id, ApplicationRecord::Types::UUID).filled(format?: ApplicationRecord::Types::UUID_REGEXP)
      required(:data).schema do
        required(:type, :string).filled(eql?: 'project_questions')
        required(:attributes).schema do
          required(:label, :string).filled(:str?)
          required(:answers, :array).each do
            required(:label, :string).filled(:str?)
            required(:require, :array).each(:str?)
            required(:exclude, :array).each(:str?)
          end
          required(:required, :bool).filled(:bool?)
        end
      end
    end

    def perform
      model.update params[:data][:attributes]
    end
  end
end
