class WelcomeController < ApplicationController
  def index
  	uid = params[:uid]
  	if uid.nil?
  		@board = Board.create(name: 'Your Board')
  	else
  		unless params[:locale].nil?
        case params[:locale]
          when 'es'
            I18n.locale = :es
          when 'en'
            I18n.locale = :en
          when 'jp'
            I18n.locale = :jp
          when 'zh'
            I18n.locale = :zh
        end
      end
  		@board = Board.find_by_uid uid
  	end
  end
end
