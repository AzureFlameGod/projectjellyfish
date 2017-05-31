module Password
  class ResetRequest < ApplicationService
    include Sanitize

    sanitize do
      required(:data).schema do
        required(:type, :string).filled(eql?: 'passwords')
        required(:attributes).schema do
          required(:email, User::Types::EMAIL).filled(format?: User::Types::EMAIL_REGEXP)
        end
      end
    end

    def perform
      if model
        model.reset_requested_at = DateTime.current
        model.regenerate_reset_password_token # Saves the model
        send_reset_password_email
      end
    end

    def model!
      User.find_by! email: params[:data][:attributes][:email]
    rescue
      # Always act as if the request has worked.
      false
    end

    private

    def send_reset_password_email
      # TODO: Implement mailer job
    end
  end
end
