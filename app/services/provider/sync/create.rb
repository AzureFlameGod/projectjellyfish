class Provider < ApplicationRecord
  module Sync
    class Create < ApplicationService
      include Sanitize
      include Model
      include Policy

      policy ProviderSyncPolicy
      model Provider, :find

      sanitize do
        required(:provider_id, ApplicationRecord::Types::UUID).filled(format?: ApplicationRecord::Types::UUID_REGEXP)
      end

      def perform
        ProviderData::SyncJob.perform_later provider_id: model.id, last_synced_at: model.last_synced_at
      end

      private

      def model_id
        params[:provider_id]
      end
    end
  end
end
