class CreateAppSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :app_settings, id: :uuid do |t|
      t.timestamps null: false

      # Authentication Settings
      t.boolean :enable_signin, default: true
      t.boolean :enable_signup, default: true

      # Remote Settings
      t.boolean :enable_remote, default: false

      # SAML Settings
      t.boolean :enable_saml, default: false
      # TODO Build out SAML authentication

      # Automatics
      t.boolean :auto_approve_services, default: false

      # Cost Quotas
      t.integer :project_budget_maximum, default: 10_000_000
      t.integer :user_default_monthly_maximum, default: 10_000

      # SMTP/Mailer settings
      t.text :mail_host, default: '127.0.0.1'
      t.text :mail_port, default: '1025'
      t.text :mail_username, default: ''
      t.text :mail_password, default: ''
      t.text :mail_authentication, default: 'plain'
      t.text :mail_ssl_verify, default: 'none'
      t.text :mail_sender, default: 'no-reply@my-pj-deployment.io'

      # Logging/Notification settings
      t.text :system_notification_email

      # Indexes
      t.index :created_at
    end
  end
end
