class CreateProductCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :product_categories, id: :uuid do |t|
      t.timestamps null: false

      t.text :name, null: false
      t.text :description, default: ''
      t.text :cached_tag_list, default: ''
    end
  end
end
