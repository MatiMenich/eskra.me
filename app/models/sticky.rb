class Sticky < ActiveRecord::Base
  belongs_to :column
  belongs_to :row

  before_create :set_default_parameters

  private

  def set_default_parameters
  	self.color = 'panel-default'
  	self.name = Sticky.human_attribute_name("new_stickie")
  	self.text = Sticky.human_attribute_name("edit_stickie");
  end
end
