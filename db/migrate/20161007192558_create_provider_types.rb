class CreateProviderTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :provider_types, id: :uuid do |t|
      t.timestamps null: false

      t.string :type, null: false

      t.text :name, null: false
      t.text :description, default: ''
      t.boolean :active, null: false, default: true

      t.index :type
    end
  end
end
