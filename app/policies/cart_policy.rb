class CartPolicy < ApplicationPolicy
  def search?
    true
  end

  class Scope < Scope
    def resolve
      scope.where(user_id: context.id)
    end
  end
end
