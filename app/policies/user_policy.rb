class UserPolicy < ApplicationPolicy
  def search?
    true
  end

  def show?
    is_admin? || is_self?
  end

  def create?
    is_admin?
  end

  def create_action?
    is_admin?
  end

  def update?
    is_admin? || is_self?
  end

  def destroy?
    is_admin? && !is_self?
  end

  private

  def is_self?
    user.id === record.id
  end
end
