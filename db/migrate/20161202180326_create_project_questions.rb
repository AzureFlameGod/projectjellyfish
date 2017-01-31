class CreateProjectQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :project_questions, id: :uuid do |t|
      t.timestamps null: false

      t.text :label, null: false
      t.json :answers, null: false, default: []
      t.boolean :required, null: false, default: true
    end
  end
end
