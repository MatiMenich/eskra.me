class Sticky < ActiveRecord::Base
  belongs_to :column
  belongs_to :row
end
