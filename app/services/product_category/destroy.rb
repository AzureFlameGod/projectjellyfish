class ProductCategory < ApplicationRecord
  class Destroy < ApplicationService
    include Model
    include Policy

    model ProductCategory, :find
    policy ProductCategoryPolicy, :destroy?

    def perform
      model.destroy
    end
  end
end
