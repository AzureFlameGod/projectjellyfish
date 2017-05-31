module ProjectRequests
  class ApprovalsController < ApplicationController
    service_class ProjectRequest::Approval
    resource_class ProjectRequest
  end
end
