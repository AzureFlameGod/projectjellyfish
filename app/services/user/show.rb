class User < ApplicationRecord
  class Show < ApplicationService
    include Model
    include Policy

    model User, :find
    policy UserPolicy, :show?
  end
end
