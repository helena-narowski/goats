class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  # skip_before_action :verify_authenticity_token
  # include ActionController::Cookies
  # after_action :set_csrf_cookie
end
