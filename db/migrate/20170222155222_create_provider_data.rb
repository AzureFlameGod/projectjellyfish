class CreateProviderData < ActiveRecord::Migration[5.0]
  def change
    create_table :provider_data, id: :uuid do |t|
      t.timestamps null: false
      t.text :data_type, null: false
      t.references :provider, type: :uuid, foreign_key: true, index: true, null: false
      t.text :name, null: false
      t.text :description
      t.text :ext_id
      t.text :ext_group_id
      t.json :properties, default: {}
      t.boolean :available, default: true
      t.boolean :deprecated, default: false

      t.index :data_type
      t.index :ext_id
      t.index :ext_group_id
    end

    change_table :providers do |t|
      t.timestamp :last_synced_at
    end
  end
end
