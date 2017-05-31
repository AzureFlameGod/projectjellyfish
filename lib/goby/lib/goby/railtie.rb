module Goby
  class Railtie < Rails::Railtie
    initializer 'goby.configuration', after: :load_config_initializers do
      Dry::Validation::Messages::Abstract.configure do |config|
        config.paths = config.paths.concat Goby.config.message_paths
      end
    end

    # initializer 'goby.application_controller' do
    #   ActiveSupport.on_load(:action_controller) do
    #     include Goby::Controller
    #   end
    # end
  end
end
