class WelcomeController < ApplicationController
  def index
  	uid = params[:uid]
  	if uid.nil?
  		@board = Board.create(name: 'Your Board')
  	else
  		@board = Board.find_by_uid uid
  	end
  end
end
