class Filter < ApplicationRecord
  acts_as_taggable

  FILTERABLES = %w(Project)

  belongs_to :filterable, polymorphic: true
end
