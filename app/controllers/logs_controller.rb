class LogsController < ApplicationController
  attr_reader :log

  def index
    logs = current_user.logs

    render json: logs
  end

  def create
    # binding.irb
    new_log = Log.create(log_params)

    if new_log.valid?
      render json: new_log
    else
      render json: { error: 'Failed to create the log' }, status: :unprocessable_entity
    end
  end

  def update
    if log.update(log_params)
      render json: { message: 'log successfully updated', log: log }, status: :ok
    else
      render json: { error: 'Failed to update log' }, status: :unprocessable_entity
    end
  end

  def destroy
    if log.destroy
      render json: { message: 'log successfully deleted' }, status: :ok
    else
      render json: { error: 'Failed to delete log' }, status: :unprocessable_entity
    end
  end

  private

  def goal
    @goal ||= current_user.goals.find(params[:goal_id])
  end

  def log
    @log ||= current_user.logs.find(params[:id])
  end

  def log_params
    params.require(:log).permit(:date, :note, :status, :goal_id)
  end
end
