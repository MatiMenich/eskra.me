class Column < ActiveRecord::Base
  belongs_to :board

  has_many :stickies
end
