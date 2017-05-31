# class Service < ApplicationRecord
#   class CheckProvisioningStatusJob < ApplicationJob
#     def perform(service_id)
#       result = Service::CheckProvisioningStatus.run(context: nil, params: { id: service_id })
#
#       if result.valid?
#         # Do something
#       else
#         # Do something else
#       end
#     end
#   end
# end
