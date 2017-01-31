class ServiceRequest < ApplicationRecord
  class BuildServiceJob < ApplicationJob
    def perform(service_request_id)
      result = ServiceRequest::BuildService.run(context: nil, params: { id: service_request_id })

      if result.valid?
        # Do something
      else
        # Do something else
      end
    end
  end
end
