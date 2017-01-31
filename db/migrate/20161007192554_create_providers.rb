class CreateProviders < ActiveRecord::Migration[5.0]
  def up
    create_table :providers, id: :uuid do |t|
      t.timestamps null: false
      t.datetime :deleted_at, index: true

      # STI
      t.string :type, null: false, index: true

      # Foreign Keys
      t.uuid :provider_type_id, null: false, index: true

      t.text :name, null: false
      t.text :description, default: ''
      t.json :credentials, null: false, default: {}
      t.boolean :active, null: false, default: true
      t.text :credentials_message
      t.text :status_message
      t.boolean :connected, null: false, default: true
      t.text :cached_tag_list, default: ''

      t.datetime :credentials_validated_at
      t.datetime :last_connected_at

      # Full Text Search
      t.column :tsv, :tsvector

      t.index :tsv, using: :gin
    end

    execute <<-SQL
      CREATE TRIGGER providers_fulltext BEFORE INSERT OR UPDATE
      ON providers FOR EACH ROW EXECUTE PROCEDURE
      tsvector_update_trigger(
        tsv, 'pg_catalog.english', name, description, cached_tag_list
      );
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER provider_fulltext
      ON providers
    SQL

    drop_table :providers
  end
end
