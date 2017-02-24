class ProviderData < ApplicationRecord
  class Sync < ApplicationService
    include Sanitize
    include Model
    include Policy

    model Provider, :find
    policy ProviderDataPolicy

    sanitize do
      required(:provider_id, ApplicationRecord::Types::UUID).filled(format?: ApplicationRecord::Types::UUID_REGEXP)
      required(:last_synced_at).filled([:date_time?, :int?, :str?, :nil?])
    end

    def perform
      return unless model.last_synced_at.to_i == params[:last_synced_at].to_i
      # timeout_seconds as 0 so that it will try to lock once, if the job is running the block will be skipped
      ProviderData.with_advisory_lock("provider-data-sync-#{model.id}", timeout_seconds: 0) do
        # Possibly have another transaction block in which we mark everything inactive, then process results
        # and create or update active provider_data
      end
    end

    private

    def model_id
      params[:provider_id]
    end
  end
end
