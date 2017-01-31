class ProjectRequest < ApplicationRecord
  class Create < ApplicationService
    include Model
    include Policy
    include Sanitize

    model ProjectRequest, :create
    policy ProjectRequestPolicy

    sanitize do
      required(:data).schema do
        required(:type, :string).filled(eql?: 'project_requests')
        required(:attributes).schema do
          required(:name, :string).filled(:str?)
          required(:request_message, :string).filled(:str?)
          required(:budget, :string).filled(format?: ApplicationRecord::Types::BUDGET_REGEXP)
        end
      end
    end

    def perform
      model.requested = true
      model.requested_at = DateTime.current
      model.update params[:data][:attributes]

      ProjectRequestMailer.needs_approval(model).deliver_later
    end

    private

    def setup_model!
      model.user_id = current_user.id
    end
  end
end
