class CreateServiceDetails < ActiveRecord::Migration
  def change
    create_view :service_details
  end
end
