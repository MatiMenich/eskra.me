class CreateRows < ActiveRecord::Migration
  def change
    create_table :rows do |t|
      t.string :name
      t.integer :order
      t.references :board, index: true

      t.timestamps
    end
  end
end
