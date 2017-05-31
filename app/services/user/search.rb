class User < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model User, :collection
    policy UserPolicy

    private

    def collection_model!
      policy_scope(super)
    end
  end
end
