class Provider < ApplicationRecord
  class Connection
    class Update < ApplicationService
      include Model
      include Policy
      include Sanitize

      model Provider, :find
      policy ProviderPolicy

      sanitize do
        required(:provider_id, ApplicationRecord::Types::UUID).filled(format?: ApplicationRecord::Types::UUID_REGEXP)
        required(:data).schema do
          required(:type, :string).filled(eql?: 'provider/connections')
        end
      end

      def perform
        Provider::CheckCredentialsJob.perform_later model.id
      end

      private

      def model_id
        params[:provider_id]
      end
    end
  end
end
