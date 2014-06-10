class WelcomeController < ApplicationController

  def landing_page

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
  end
end
