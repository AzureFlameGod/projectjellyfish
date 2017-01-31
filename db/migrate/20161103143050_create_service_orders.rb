class CreateServiceOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :service_orders, id: :uuid do |t|
      t.timestamps null: false

      # Foreign Keys
      t.uuid :user_id, null: false

      t.integer :status, null: false, default: 0
      t.integer :ordered_count, null: false, default: 0
      t.integer :approved_count, null: false, default: 0
      t.integer :denied_count, null: false, default: 0
      t.decimal :setup_total, null: false, default: 0.0, scale: 4, precision: 10
      t.decimal :monthly_total, null: false, default: 0.0, scale: 4, precision: 10

      t.datetime :ordered_at
      t.datetime :completed_at

      # Indexes
      t.index :user_id
      t.index :status
    end
  end
end
