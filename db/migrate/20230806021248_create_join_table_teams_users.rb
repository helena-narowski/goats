class CreateJoinTableTeamsUsers < ActiveRecord::Migration[7.0]
  def change
    create_join_table :teams, :users do |t|
      # t.references :team, null: false, foreign_key: true
      # t.references :user, null: false, foreign_key: true
    end
  end
end
