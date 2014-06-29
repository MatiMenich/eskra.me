class Board < ActiveRecord::Base

	has_many :columns
	has_many :rows

	before_create :generate_unique_uid

	after_create :create_default_parameters

	private
	def generate_unique_uid
		begin 
			self.uid = SecureRandom.urlsafe_base64
		end while Board.exists?(uid: self.uid)
	end


	def create_default_parameters
		Column.create(name: Board.human_attribute_name("todo"), column_order: 1, board_id: self.id)
		Column.create(name: Board.human_attribute_name("doing"), column_order: 2, board_id: self.id)
		Column.create(name: Board.human_attribute_name("done"), column_order: 3, board_id: self.id)
		Row.create(order: 1, board_id: self.id)
	end
end
