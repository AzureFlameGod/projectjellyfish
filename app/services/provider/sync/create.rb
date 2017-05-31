class Provider < ApplicationRecord
  module Sync
    class Create < ApplicationService
      include Sanitize
      include Model
      include Policy

      model Provider, :find
      policy ProviderSyncPolicy

      sanitize do
        required(:provider_id, ApplicationRecord::Types::UUID).filled(format?: ApplicationRecord::Types::UUID_REGEXP)
        required(:data).schema do
          required(:type, :string).filled(eql?: 'provider/sync')
        end
      end

      def perform
        ProviderData::SyncJob.perform_later model.id, model.last_synced_at.to_s
      end

      private

      def model_id
        params[:provider_id]
      end
    end
  end
end
