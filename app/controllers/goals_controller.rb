class GoalsController < ApplicationController
  attr_reader :goal

  def index
    goals = current_user.goals

    render json: goals
  end

  def create
    new_goal = current_user.goals.create(goal_params)

    if new_goal.valid?
      render json: new_goal
    else
      render json: new_goal.errors, status: :unprocessable_entity
    end
  end

  def update
    if goal.update(goal_params)
      render json: { message: 'Goal successfully updated', goal: goal }, status: :ok
    else
      render json: { error: 'Failed to update goal' }, status: :unprocessable_entity
    end
  end

  def destroy
    if goal.logs.any?
      render json: { error: 'Goal cannot be deleted as it has logs associated with it' }, status: :unprocessable_entity
    elsif goal.destroy
      render json: { message: 'Goal successfully deleted' }, status: :ok
    else
      render json: { error: 'Failed to delete goal' }, status: :unprocessable_entity
    end
  end

  private

  def goal
    @goal ||= current_user.goals.find(params[:id])
  end

  def goal_params
    params.require(:goal).permit(:name, :category)
  end
end
