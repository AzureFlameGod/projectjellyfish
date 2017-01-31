class ProductCategory < ApplicationRecord
  class Update < ApplicationService
    include Model
    include Policy
    include Sanitize

    model ProductCategory, :update
    policy ProductCategoryPolicy, :update?

    sanitize do
      required(:id, ApplicationRecord::Types::UUID).filled(format?: ApplicationRecord::Types::UUID_REGEXP)
      required(:data).schema do
        required(:type, :string).filled(eql?: 'product_categories')
        required(:attributes).schema do
          required(:name, :string).filled(:str?)
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
