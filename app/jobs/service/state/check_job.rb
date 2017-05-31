class Service < ApplicationRecord
  module State
    class CheckJob < ApplicationJob
      def perform(service_id, updated_at)
        result = Service::State::Check.run(context: nil, params: { id: service_id, updated_at: updated_at })

        if result.valid?
          # Do something
        else
          # Do something else
          Rails.logger.info result.errors
        end
      end
    end
  end
end
