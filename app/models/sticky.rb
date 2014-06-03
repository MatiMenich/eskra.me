class Sticky < ActiveRecord::Base
  belongs_to :column
  belongs_to :row

  before_create :set_default_parameters

  private

  def set_default_parameters
  	self.color = 'panel-default'
  	self.name = 'New Stickie'
  	self.text = 'Edit your new stickie content'
  end
end
