module Logging
  extend ActiveSupport::Concern

  included do
    has_many :logs, as: :loggable, dependent: :delete_all
  end

  def log(level = :error, message: '', hidden: false)
    level = :error unless Log.log_levels.keys.include? level.to_s
    logs.create log_level: level, message: message, hidden: hidden
  end
end
