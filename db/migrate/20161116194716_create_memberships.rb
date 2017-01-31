class CreateMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :memberships, id: :uuid do |t|
      t.timestamps null: false

      # Foreign Keys
      t.references :project, type: :uuid, null: false
      t.references :user, type: :uuid, null: false

      t.integer :role, null: false, default: 0
      t.boolean :locked, null: false, default: false

      t.index [:project_id, :user_id], unique: true
    end
  end
end
