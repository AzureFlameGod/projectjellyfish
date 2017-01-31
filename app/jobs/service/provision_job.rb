# class Service < ApplicationRecord
#   class ProvisionJob < ApplicationJob
#     def perform(service_id)
#       results = Service::Provision.run(context: nil, params: { id: service_id })
#
#       if results.valid?
#         # Do something
#       else
#         # Do something else
#       end
#     end
#   end
# end
