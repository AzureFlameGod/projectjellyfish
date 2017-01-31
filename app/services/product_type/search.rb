class ProductType < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model ProductType, :collection
    policy ProductTypePolicy, :search?

    sort_by name: :asc
  end
end
