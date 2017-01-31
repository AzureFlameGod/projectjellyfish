# Be sure to restart your server when you modify this file.

# Add new mime types for use in respond_to blocks:
# Mime::Type.register "text/richtext", :rtf

Mime::Type.register 'application/vnd.api+json'.freeze, :jsonapi

ActionDispatch::Request.parameter_parsers[:jsonapi] = lambda do |body|
  data = JSON.parse(body)
  data = { _json: data } unless data.is_a?(Hash)
  data.with_indifferent_access
end
