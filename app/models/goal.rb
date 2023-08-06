class Goal < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :category, inclusion: { in: %w[Learning Fitness Travel Cooking],
                                    message: '%<value>s is not a valid category' },
                       allow_nil: true

  has_many :logs, dependent: :destroy
end
