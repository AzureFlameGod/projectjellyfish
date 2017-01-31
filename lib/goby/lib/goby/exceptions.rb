module Goby
  module Exceptions
    class Error < StandardError
      def errors
        # :nocov:
        raise NoMethodError, 'Subclass of Error must implement errors method'
        # :nocov:
      end
    end

    class InternalServerError < Error
      attr_accessor :exception

      def initialize(exception)
        @exception = exception
      end

      def errors
        meta = nil

        if Goby.config.include_backtraces
          meta = {
            exception: exception.message,
            backtrace: exception.backtrace
          }
        end

        [Goby::Error.new(code: 'INTERNAL_SERVER_ERROR',
          status: :internal_server_error,
          title: 'Internal Server Error',
          detail: 'Internal Server Error',
          meta: meta)]
      end
    end

    class ValidationErrors < Error
      attr_reader :error_data

      def initialize(error_data)
        @error_data = error_data
      end

      def errors
        @errors ||= parse_nested error_data
      end

      def parse_nested(obj, path = '')
        return obj unless obj.is_a? Hash

        obj.map do |key, value|
          sub_path = [path, key].join('/')
          if value.is_a? Hash
            parse_nested value, sub_path
          else
            next value unless value.respond_to?(:map)
            value.map do |error|
              pointer = error == 'is missing' ? path : sub_path
              detail = "`#{sub_path}` #{error}"
#              detail = error == 'is missing' ? "`#{sub_path}` is missing" : error

              Goby::Error.new(status: :unprocessable_entity,
                code: 'VALIDATION_ERROR',
                title: 'Validation error',
                source: { pointer: pointer },
                detail: detail)
            end
          end
        end.flatten
      end
    end

    class MissingPresenter < Error
      attr_reader :class_name

      def initialize(class_name)
        @class_name = class_name.to_s
      end

      def errors
        if Rails.env.development?
          [Goby::Error.new(status: :not_implemented,
            code: 'MISSING_PRESENTER',
            title: 'Missing presenter',
            detail: "Expected to find `#{class_name}Presenter` for resource `#{class_name}`"
          )]
        else
          [Goby::Error.new(status: :internal_server_error,
            code: 'INTERNAL_SERVER_ERROR',
            title: 'Internal server error',
            detail: "Missing implementation of `#{class_name}Presenter`"
          )]
        end
      end
    end

    class NotAuthorized < Error
      attr_reader :action, :resource_type

      def initialize(action, resource_type)
        @action = action.to_s.sub('?', '')
        @resource_type = resource_type
      end

      def errors
        [Goby::Error.new(status: :unauthorized,
          code: 'AUTHORIZATION_ERROR',
          title: 'Not authorized',
          detail: "You do not have permission to call `#{action}` on `#{resource_type}`"
        )]
      end
    end

    class InvalidResource < Error
      attr_accessor :resource_type

      def initialize(resource_type)
        @resource_type = resource_type
      end

      def errors
        [Goby::Error.new(status: :bad_request,
          code: 'INVALID_RESOURCE',
          title: 'Invalid Resource',
          detail: "`#{resource_type}` is not a valid resource"
        )]
      end
    end

    class RecordNotFound < Error
      attr_reader :id, :path

      def initialize(id, path = nil)
        @id = id
        @path = path
      end

      def errors
        [Goby::Error.new(status: path.nil? ? :not_found : :unprocessable_entity,
          code: 'RECORD_NOT_FOUND',
          title: 'Record not found',
          detail: "The record identified by `#{id}` could not be found",
          source: (path ? { pointer: path } : nil)
        )]
      end
    end

    class RecordNotUnique < Error
      def errors
        [Goby::Error.new(status: :unprocessable_entity,
          code: 'RECORD_NOT_UNIQUE',
          title: 'Record not unique',
          detail: 'The record parameters have violated a unique constraint'
        )]
      end
    end

    class InvalidFieldsFormat < Error
      def errors
        [Goby::Error.new(status: :bad_request,
          code: 'INVALID_FIELDS_FORMAT',
          title: 'Invalid fields format',
          detail: 'Must specify a resource type and selected fields'
        )]
      end
    end

    class InvalidField < Error
      attr_accessor :type, :field

      def initialize(type, field)
        @field = field
        @type = type
      end

      def errors
        [Goby::Error.new(status: :bad_request,
          code: 'INVALID_FIELD',
          title: 'Invalid field',
          detail: "`#{field}` is not a valid field for #{type}"
        )]
      end
    end

    class InvalidInclude < Error
      attr_accessor :type, :association

      def initialize(type, association)
        @type = type
        @association = association
      end

      def errors
        [Goby::Error.new(status: :bad_request,
          code: 'INVALID_INCLUDE',
          title: 'Invalid include',
          detail: "`#{association}` is not a valid relationship of #{type}"
        )]
      end
    end

    class InvalidFiltersFormat < Error
      attr_accessor :filters

      def initialize(filters)
        @filters = filters
      end

      def errors
        [Goby::Error.new(status: :bad_request,
          code: 'INVALID_FILTERS_FORMAT',
          title: 'Invalid filters format',
          detail: "`#{filters}` is not a valid format for filtering"
        )]
      end
    end

    class FilterNotAllowed < Error
      attr_accessor :filter

      def initialize(filter)
        @filter = filter
      end

      def errors
        [Goby::Error.new(status: :bad_request,
          code: 'FILTER_NOT_ALLOWED',
          title: 'Filter not allowed',
          detail: "`#{filter}` can not be used to filter"
        )]
      end
    end

    class InvalidSortCriteria < Error
      attr_accessor :resource, :sort

      def initialize(resource, sort)
        @resource = resource
        @sort = sort
      end

      def errors
        [Goby::Error.new(status: :bad_request,
          code: 'INVALID_SORT',
          title: 'Invalid sort',
          detail: "`#{sort}` is not a valid sort criteria for #{resource}"
        )]
      end
    end

    class InvalidPaginationParam < Error
      attr_accessor :params

      def initialize(params)
        @params = params
      end

      def errors
        params.map do |param|
          Goby::Error.new(status: :bad_request,
            code: 'INVALID_PAGINATION_PARAM',
            title: 'Invalid pagination parameter',
            detail: "`#{param}` is not an allowed page parameter"
          )
        end
      end
    end

    class InvalidPageValue < Error
      attr_accessor :parem, :value

      def initialize(parem, value)
        @parem = parem
        @value = value
      end

      def errors
        [Goby::Error.new(status: :bad_request,
          code: 'INVALID_PAGE_VALUE',
          title: 'Invalid page value',
          detail: "`#{value}` is not a valid value for `#{parem}` page parameter"
        )]
      end
    end
  end
end
