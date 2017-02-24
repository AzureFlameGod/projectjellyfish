class ProviderDataPolicy < ApplicationPolicy
  def search?
    true
  end

  def sync?
    is_admin?
  end
end
