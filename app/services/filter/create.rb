class Filter < ApplicationRecord
  class Create < ApplicationService
    include Model
    include Policy
    include Sanitize

    model Filter, :create
    policy FilterPolicy

    sanitize do
      required(:data).schema do
        required(:type, :string).filled(eql?: 'filters')
        required(:attributes).schema do
          required(:filterable_id, ApplicationRecord::Types::UUID).filled(format?: ApplicationRecord::Types::UUID_REGEXP)
          required(:filterable_type, :string).filled(included_in?: Filter::FILTERABLES)
          required(:exclude, :bool).filled(:bool?)
          required(:tag_list, :array).each(:str?)
        end
      end
    end

    def perform
      model.update params[:data][:attributes]
    end
  end
end
