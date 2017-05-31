module Goby
  class Service
    module Callbacks
      extend  ActiveSupport::Concern
      include ActiveSupport::Callbacks

      included do
        define_callbacks :perform
      end

      module ClassMethods
        def before_perform(*filters, &blk)
          set_callback(:perform, :before, *filters, &blk)
        end

        def after_perform(*filters, &blk)
          set_callback(:perform, :after, *filters, &blk)
        end

        def around_perform(*filters, &blk)
          set_callback(:perform, :around, *filters, &blk)
        end
      end
    end
  end
end
