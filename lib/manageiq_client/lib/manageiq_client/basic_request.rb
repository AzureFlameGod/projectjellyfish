module BasicRequest
  def basic_request(name, uri: nil, expects: [200], method: 'GET', headers: {}, body: '')
    define_method(name) do |request_uri = nil, options = {}|
      request(
        uri: [uri || name, request_uri].compact.join('/'),
        expects: options[:expects] || expects,
        method: options[:method] || method,
        headers: options[:headers] || headers,
        body: options[:body] || body,
        parse: true
      )
    end
  end
end
