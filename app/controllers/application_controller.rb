class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  helper_method :current_user

  def current_user
    # If the user is logged in, grab them by their id
    session[:user_id].nil? ? nil : User.find(session[:user_id])
  end
end
