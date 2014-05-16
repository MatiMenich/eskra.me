class CreateColumns < ActiveRecord::Migration
  def change
    create_table :columns do |t|
      t.text :name
      t.integer :order
      t.references :board, index: true

      t.timestamps
    end
  end
end
