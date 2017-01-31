class ProductType < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model ProductType, :find
    policy ProductTypePolicy, :show?
  end
end
