class ApplicationController < ActionController::API
  rescue_from StandardError, with: :error_handler

  def error_handler(exception)
    Rails.logger.debug("exception: #{exception.inspect}")
    render json: exception, status: 500
  end
end
