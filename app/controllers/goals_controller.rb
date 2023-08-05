class GoalsController < ApplicationController

  def index
    goals = current_user.goals

    render json: goals
  end
end
