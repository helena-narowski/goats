# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# db/seeds.rb

# Create some users
# user1 = User.create(email: 'user1@example.com', password: 'password')
# user2 = User.create(email: 'user2@example.com', password: 'password')
me = User.find_by(email: 'hnarowski13@gmail.com')
# Create some goals
Goal.create(name: 'Learn Ruby on Rails', user: me, category: 'Learning')
Goal.create(name: 'Run a marathon', user: me, category: 'Fitness')
Goal.create(name: 'Read 50 books this year', user: me)
Goal.create(name: 'Travel to Japan', user: me, category: 'Travel')
Goal.create(name: 'Learn to cook', user: me, category: 'Cooking')

team = Team.create(name: 'Team 1')
team.users << me
# db/seeds.rb
