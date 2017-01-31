class CreateProjects < ActiveRecord::Migration[5.0]
  def up
    create_table :projects, id: :uuid do |t|
      t.timestamps null: false
      t.datetime :deleted_at, index: true

      t.text :name, null: false
      t.text :description, null: false, default: ''
      t.decimal :budget, null: false, default: 0.0, scale: 2, precision: 12
      t.decimal :spent, null: false, default: 0.0, scale: 4, precision: 14
      t.decimal :monthly_spend, null: false, default: 0.0, scale: 2, precision: 12
      t.json :product_policy, null: false, default: {}

      t.datetime :last_hourly_compute_at, null: false, index: true
      t.datetime :last_monthly_compute_at, null: false, index: true

      # Full Text Search
      t.column :tsv, :tsvector

      t.index :tsv, using: :gin
    end

    execute <<-SQL
      CREATE TRIGGER projects_fulltext BEFORE INSERT OR UPDATE
      ON projects FOR EACH ROW EXECUTE PROCEDURE
      tsvector_update_trigger(
        tsv, 'pg_catalog.english', name, description
      );
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER projects_fulltext
      ON projects
    SQL

    drop_table :projects
  end
end
