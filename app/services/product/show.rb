class Product < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model Product, :find
    policy ProductPolicy, :show?
  end
end
