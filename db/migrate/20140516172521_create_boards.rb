class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.text :name
      t.text :uid

      t.timestamps
    end
  end
end
