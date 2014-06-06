class WelcomeController < ApplicationController
  def index
  	uid = params[:uid]
  	if uid.nil?
  		@board = Board.create(name: 'Your Board')
  	else
  		unless params[:locale].nil?
  			if params[:locale] == 'es'
  				I18n.locale = :es
  			else
  				I18n.locale = :en
  			end
  		end

  		@board = Board.find_by_uid uid
  	end
  end
end
