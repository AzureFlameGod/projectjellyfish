module Goby
  class Error
    attr_reader :status, :code, :title, :detail, :source, :meta

    def initialize(options = {})
      @status = options[:status]

      @code = options[:code]
      @title = options[:title]
      @detail = options[:detail]
      @source = options[:source]
      @meta = options[:meta]
    end

    def to_hash
      hash = {}

      hash[:code] = code if code
      hash[:title] = title if title
      hash[:detail] = detail if detail
      hash[:source] = source if source
      hash[:meta] = meta if meta

      hash
    end
  end
end
