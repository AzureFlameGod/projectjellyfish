class CredentialValidationSerializer < ApplicationSerializer
  attributes :valid, :message

  def _id
    ''
  end

  def self_link
    nil
  end
end
