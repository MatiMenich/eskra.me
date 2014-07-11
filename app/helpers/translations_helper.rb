module TranslationsHelper

	def set_locale
		I18n.locale = params[:locale] || cookies[:locale] || I18n.default_locale 
		cookies[:locale] = { :value => I18n.locale, :httponly => true }
	end

	def current_translations
	  @translations ||= I18n.backend.send(:translations)
	  @translations[I18n.locale].with_indifferent_access
	end

	
end