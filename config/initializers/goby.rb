Goby.configure do |config|
  config.message_paths = [Rails.root.join('app', 'services', 'errors.yml')]
  config.default_page_size = 20
  config.max_page_size = 100
  config.related_links = false
end

Goby::Service.logger = Rails.logger
