class Filter < ApplicationRecord
  class Destroy < ApplicationService
    include Model
    include Policy

    model Filter, :find
    policy FilterPolicy

    def perform
      model.destroy
    end
  end
end
