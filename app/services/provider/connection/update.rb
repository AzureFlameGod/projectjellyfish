class Provider < ApplicationRecord
  class Connection
    class Update < ApplicationService
      include Model
      include Policy

      model Provider, :find
      policy ProviderPolicy

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
