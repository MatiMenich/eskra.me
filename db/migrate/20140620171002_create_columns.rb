class CreateColumns < ActiveRecord::Migration
  def change
    create_table :columns do |t|
      t.string :name
      t.integer :column_order
      t.references :board, index: true

      t.timestamps
    end
  end
end
