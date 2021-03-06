class Row < ActiveRecord::Base
  belongs_to :board

  has_many :stickies
  
  before_create :set_default_parameters

  private

  def set_default_parameters
  	self.name = Row.human_attribute_name("new_lane")
  end

end
