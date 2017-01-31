class Filter < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model Filter, :find
    policy FilterPolicy, :show?
  end
end
