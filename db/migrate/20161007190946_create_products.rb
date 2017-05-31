class CreateProducts < ActiveRecord::Migration[5.0]
  def up
    create_table :products, id: :uuid do |t|
      t.timestamps null: false
      t.datetime :deleted_at, index: true

      # STI
      t.string :type, index: true

      # Foreign Keys
      t.uuid :provider_id, null: false, index: true
      t.uuid :product_type_id, null: false, index: true

      t.text :name, null: false
      t.text :description, null: false, default: ''
      t.json :properties, null: false, default: []
      t.json :settings, null: false, default: {}
      t.boolean :active, null: false, default: true
      t.decimal :setup_price, null: false, default: 0.0, scale: 4, precision: 10
      t.decimal :hourly_price, null: false, default: 0.0, scale: 4, precision: 10
      t.decimal :monthly_price, null: false, default: 0.0, scale: 4, precision: 10
      t.text :cached_tag_list, default: ''

      # Full Text Search
      t.column :tsv, :tsvector

      t.index :tsv, using: :gin
    end

    execute <<-SQL
      CREATE TRIGGER products_fulltext BEFORE INSERT OR UPDATE
      ON products FOR EACH ROW EXECUTE PROCEDURE
      tsvector_update_trigger(
        tsv, 'pg_catalog.english', name, description, cached_tag_list
      );
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER product_fulltext
      ON products
    SQL

    drop_table :products
  end
end
