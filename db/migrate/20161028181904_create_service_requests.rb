class CreateServiceRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :service_requests, id: :uuid do |t|
      t.timestamps null: false
      t.datetime :deleted_at, index: true

      # STI
      t.string :type, index: true

      # Foreign Keys
      t.uuid :user_id, null: false, index: true
      t.uuid :processor_id, index: true
      t.uuid :product_id, null: false, index: true
      t.uuid :project_id, null: false, index: true
      t.uuid :service_order_id, index: true

      t.text :service_name, null: false, default: ''
      t.text :state
      # t.integer :status, null: false, default: 0
      # t.boolean :configured, null: false, default: false
      # t.boolean :requested, null: false, default: false
      t.text :request_message
      t.text :processed_message
      t.json :settings, null: false, default: {}
      t.decimal :setup_price, scale: 4, precision: 10
      t.decimal :hourly_price, scale: 4, precision: 10
      t.decimal :monthly_price, scale: 4, precision: 10

      # t.datetime :requested_at
      # t.datetime :processed_at

    end
  end
end
