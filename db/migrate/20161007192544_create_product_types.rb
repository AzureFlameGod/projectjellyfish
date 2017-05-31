class CreateProductTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :product_types, id: :uuid do |t|
      t.timestamps null: false

      # STI
      t.string :type, null: false, index: true

      # Foreign Keys
      t.uuid :provider_type_id, null: false, index: true

      t.text :name, null: false
      t.text :description
      t.boolean :active, null: false, default: true
    end
  end
end
