# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include ActionController::MimeResponds

  respond_to :json

  def current
    if user_signed_in?
      render json: current_user.as_json(except: [:encrypted_password, :reset_password_token, :reset_password_sent_at])
    else
      render json: {}, status: :unauthorized
    end
  end
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
