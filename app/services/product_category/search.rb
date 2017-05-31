class ProductCategory < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model ProductCategory, :collection
    policy ProductCategoryPolicy, :search?

    sort_by name: :asc

    def collection_model!
      super.includes(:taggings)
    end
  end
end
