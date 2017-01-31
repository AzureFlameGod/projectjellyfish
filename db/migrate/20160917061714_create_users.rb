class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users, id: :uuid do |t|
      t.timestamps null: false
      t.datetime :deleted_at

      t.text :name, null: false
      t.text :email, null: false
      t.integer :role, default: 0, null: false
      t.text :password_digest, null: false
      t.text :state
      t.text :session_token
      t.text :reset_password_token
      t.datetime :reset_requested_at
      t.datetime :last_login_at
      t.text :last_client_info
      t.datetime :last_failed_login_at
      t.text :last_failed_client_info
      t.datetime :disabled_at

      # Indexes
      t.index :state
      t.index :session_token
    end

    execute 'CREATE UNIQUE INDEX index_users_on_lower_email ON users(LOWER(email));'
  end
end
