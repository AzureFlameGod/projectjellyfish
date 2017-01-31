class ProductCategory < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ProductCategory, :find
    policy ProductCategoryPolicy, :show?
  end
end
