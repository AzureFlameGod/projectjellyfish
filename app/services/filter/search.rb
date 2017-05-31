class Filter < ApplicationRecord
  class Search < ApplicationService
    include Model
    include Policy

    model Filter, :collection
    policy FilterPolicy
  end
end
