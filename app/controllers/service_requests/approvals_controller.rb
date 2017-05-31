module ServiceRequests
  class ApprovalsController < ApplicationController
    service_class ServiceRequest::Approval
    resource_class ServiceRequest
  end
end
