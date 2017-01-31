module Providers
  class CredentialsController < ApplicationController
    service_class CredentialValidation
    resource_class CredentialValidation
  end
end
