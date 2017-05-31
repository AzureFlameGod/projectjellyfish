class CreateServices < ActiveRecord::Migration[5.0]
  def change
    create_table :'services', id: :uuid do |t|
      t.timestamps null: false

      # STI
      t.string :type, index: true

      # Foreign Keys
      t.uuid :user_id, null: false, index: true
      t.uuid :provider_id, null: false, index: true
      t.uuid :product_id, null: false, index: true
      t.uuid :project_id, null:false, index: true
      t.uuid :service_request_id, null: false, index: true
      t.uuid :service_order_id, null: false, index: true

      t.text :name, null: false
      t.text :state
      t.integer :monitor_frequency, null: false, default: 0
      t.text :status_message
      t.boolean :billable, null: false, default: false
      t.decimal :hourly_price, scale: 4, precision: 10
      t.decimal :monthly_price, scale: 4, precision: 10
      t.json :settings, null: false, default: {}
      t.json :details, null: false, default: {}
      t.text :actions

      t.datetime :last_changed_at
      t.datetime :last_checked_at

      t.index :last_checked_at
      t.index :state
      t.index :monitor_frequency
      t.index :billable
    end
  end
end
