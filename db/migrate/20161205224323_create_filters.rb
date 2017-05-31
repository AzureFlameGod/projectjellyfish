class CreateFilters < ActiveRecord::Migration[5.0]
  def change
    create_table :filters, id: :uuid do |t|
      t.timestamps null: false

      t.uuid :filterable_id, null: false
      t.text :filterable_type, null: false
      t.boolean :exclude, null: false, default: false
      t.text :cached_tag_list

      t.index [:filterable_type, :filterable_id]
    end

    execute "CREATE INDEX index_filters_on_cached_tag_list_array ON filters USING GIN (STRING_TO_ARRAY(cached_tag_list, ', '));"
  end
end
