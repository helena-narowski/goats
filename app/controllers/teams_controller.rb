class TeamsController < ApplicationController

  attr_reader :team

  def index
    teams = current_user.teams

    render json: teams
  end

  def create
    new_team = current_user.teams.create(team_params)

    if new_team.valid?
      render json: new_team
    else
      render json: new_team.errors, status: :unprocessable_entity
    end
  end

  # def update
  #   if team.update(team_params)
  #     render json: { message: 'team successfully updated', team: team }, status: :ok
  #   else
  #     render json: { error: 'Failed to update team' }, status: :unprocessable_entity
  #   end
  # end

  # def destroy
  #   if team.destroy
  #     render json: { message: 'Team successfully deleted' }, status: :ok
  #   else
  #     render json: { error: 'Failed to delete team' }, status: :unprocessable_entity
  #   end
  # end

  private

  def team
    @team ||= current_user.teams.find(params[:id])
  end

  def team_params
    params.require(:team).permit(:name)
  end
end
