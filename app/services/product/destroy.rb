class Product < ApplicationRecord
  class Destroy < ApplicationService
    include Model
    include Policy

    model Product, :find
    policy ProductPolicy, :destroy?

    def perform
      model.destroy
    end
  end
end
