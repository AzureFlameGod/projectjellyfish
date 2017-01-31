class ProjectQuestion < ApplicationRecord
  class Create < ApplicationService
    include Model
    include Policy
    include Sanitize

    model ProjectQuestion, :create
    policy ProjectQuestionPolicy

    sanitize do
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
