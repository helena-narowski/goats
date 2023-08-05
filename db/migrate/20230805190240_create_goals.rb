class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true
      t.string :category

      t.timestamps
    end
  end
end
