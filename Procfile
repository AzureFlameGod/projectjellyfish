# Use Only For Development
#
# NOT a production Procfile
server: bundle exec puma -C config/puma.rb -p ${PORT:-3000} -e ${RACK_ENV:-development}
worker: bundle exec sidekiq -e ${RACK_ENV:-development}
mail: mailcatcher -f --http-port ${PORT:-3200} || echo "\nInstall mailcatcher with 'gem install mailcatcher'\n"
tail: tail -f log/${RACK_ENV:-development}.log
