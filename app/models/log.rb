class Log < ApplicationRecord
  belongs_to :goal
  validates :goal, presence: true
  validates :date, presence: true

  validates :date, uniqueness: { scope: :goal_id }
end
