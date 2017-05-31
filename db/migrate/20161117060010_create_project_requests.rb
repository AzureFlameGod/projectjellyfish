class CreateProjectRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :project_requests, id: :uuid do |t|
      t.timestamps null: false

      # Foreign Keys
      t.references :user, type: :uuid, null: false
      t.references :processor, type: :uuid
      t.references :project, type: :uuid

      t.integer :status, null: false, default: 0
      t.boolean :requested, null: false, default: false
      t.text :name, null: false
      t.decimal :budget, null: false, default: 0.0, scale: 2, precision: 12
      t.text :request_message
      t.text :processed_message

      t.datetime :requested_at
      t.datetime :processed_at
    end
  end
end
