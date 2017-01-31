class ServiceOrder < ApplicationRecord
  class Create < ApplicationService
    include Model
    include Policy
    include Sanitize
    include Validation

    model ServiceOrder, :create
    policy ServiceOrderPolicy

    sanitize do
      required(:data).schema do
        required(:type, :string).filled(eql?: 'service_orders')
      end
    end

    def perform
      # Avoid creating request-less orders
      return if service_requests.empty?

      ServiceOrder.transaction do
        model.status = :pending
        model.ordered_at = DateTime.current
        model.user_id = context.id
        model.setup_total = setup_total
        model.monthly_total = monthly_total
        model.ordered_count = service_requests.length
        model.save

        service_requests.each do |service_request|
          # service_request.status = :pending
          # service_request.requested = true
          # service_request.requested_at = DateTime.current
          service_request.service_order_id = model.id
          service_request.setup_price = service_request.product.setup_price
          service_request.hourly_price = service_request.product.hourly_price
          service_request.monthly_price = service_request.product.monthly_price
          # service_request.save
          service_request.order
        end
      end
    end

    private

    def setup_total
      service_requests.inject(0) { |total, request| total += request.product.setup_price }
    end

    def monthly_total
      service_requests.inject(0) { |total, request| total += request.product.monthly_cost }
    end

    def service_requests
      @service_requests ||= ServiceRequest.includes(:product).with_state(:configured).where user_id: context.id
    end
  end
end
