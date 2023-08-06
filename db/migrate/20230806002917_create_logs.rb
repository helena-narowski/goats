class CreateLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :logs do |t|
      t.date :date, null: false
      t.references :goal, null: false, foreign_key: true
      t.text :note
      t.string :status

      t.timestamps
    end
  end
end
