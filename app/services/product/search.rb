class Product < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model Product, :collection
    policy ProductPolicy, :search?

    sort_by name: :asc
  end
end
