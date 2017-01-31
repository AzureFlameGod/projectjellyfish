class ProductCategory < ApplicationRecord
  class Create < ApplicationService
    include Model
    include Policy
    include Sanitize

    model ProductCategory, :create
    policy ProductCategoryPolicy, :create?

    sanitize do
      required(:data).schema do
        required(:type, :string).filled(eql?: 'product_categories')
        required(:attributes).schema do
          required(:name, :string).filled
          optional(:description, :string)
          optional(:tag_list, :array).each(:str?)
        end
      end
    end

    def perform
      model.update params[:data][:attributes]
    end
  end
end
