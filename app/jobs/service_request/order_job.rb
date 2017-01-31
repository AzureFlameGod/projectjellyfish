# class ServiceRequest < ApplicationRecord
#   class OrderJob < ApplicationJob
#     def perform(service_request_id)
#       result = ServiceRequest::Order.run(context: nil, params: { id: service_request_id })
#
#       if result.valid?
#         # Do something
#       else
#         # Do something else
#       end
#     end
#   end
# end
