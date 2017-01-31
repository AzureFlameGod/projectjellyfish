# class ServiceRequest < ApplicationRecord
#   class Order < ApplicationService
#     include Model
#
#     model ServiceRequest, :find
#
#     def perform
#       if model.pending?
#         model.status = :ordered
#         model.ordered_at = DateTime.current
#         model.save
#
#         # Create the service record; populate then start provisioning job
#         service.name = model.service_name
#         service.settings = service.class.combine_settings model.product.settings, model.settings
#         service.details = service.class.default_details
#         service.save
#
#         Service::ProvisionJob.set(wait: ApplicationJob::WAIT).perform_later service.id
#       end
#     end
#
#     private
#
#     def service
#       @service ||= model.class.service_class.new user_id: model.user_id,
#         service_order_id: model.service_order_id,
#         service_request_id: model.id,
#         product_id: model.product_id,
#         provider_id: model.product.provider_id
#     end
#   end
# end
