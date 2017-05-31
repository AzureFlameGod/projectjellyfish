module Goby
  class Config
    attr_accessor :message_paths, :default_page_size, :max_page_size, :related_links, :include_backtraces

    def initialize
      @message_paths = []
      @default_page_size = nil
      @max_page_size = nil
      @related_links = true
      @include_backtraces = false
    end
  end
end
