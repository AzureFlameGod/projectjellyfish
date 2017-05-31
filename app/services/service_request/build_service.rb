class ServiceRequest < ApplicationRecord
  class BuildService < ApplicationService
    include Model

    model ServiceRequest, :find

    def perform
      # Create the service record; populate then start provisioning job
      create_service

      Service::State::ChangeJob.set(wait: ApplicationJob::WAIT).perform_later(service.id, 'provision')
    end

    private

    def create_service
      service.name = model.service_name
      service.settings = service.class.combine_settings model.product.settings, model.settings
      service.details = service.class.default_details
      service.actions = 'provision'
      service.last_checked_at = DateTime.current
      service.last_changed_at = DateTime.current
      service.save
    end

    def service
      @service ||= model.class.service_class.new(
        user_id: model.user_id,
        project_id: model.project_id,
        product_id: model.product_id,
        provider_id: model.product.provider_id,
        service_order_id: model.service_order_id,
        service_request_id: model.id
      )
    end
  end
end
