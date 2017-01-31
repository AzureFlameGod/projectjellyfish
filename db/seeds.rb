# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'active_record/fixtures'

fixtures_dir = File.join Rails.root, 'db', 'fixtures'
fixture_files = Dir["#{fixtures_dir}/**/*.yml"].map {|f| f[(fixtures_dir.size + 1)..-5] }

settings = AppSetting.current || AppSetting.create_defaults

puts '== Seeding database with fixture data'
ActiveRecord::FixtureSet.create_fixtures(fixtures_dir, fixture_files)
puts '== done'
