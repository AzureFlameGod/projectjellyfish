module CloudForms
  class Provider < ::Provider
    belongs_to :provider_type

    credential :host
    credential :username
    credential :password, encrypted: true

    def self.credentials_schema(mode = :create)
      Dry::Validation.Schema(build: false) do
        required(:host, ApplicationRecord::Types::HOST).filled(format?: ApplicationRecord::Types::HOST_REGEXP)
        required(:username).filled(:str?)
        if mode == :create
          required(:password).filled(:str?)
        else
          optional(:password).value(:str?)
        end
      end
    end

    def valid_credentials?
      client.reconnect
    end

    def client
      @client ||= ManageIQClient::Client.new host: host, username: username, password: password, connection_options: { ssl_verify_peer: false }
    end
  end
end
