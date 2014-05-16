class Stickie < ActiveRecord::Base
  belongs_to :column
  belongs_to :row
end
