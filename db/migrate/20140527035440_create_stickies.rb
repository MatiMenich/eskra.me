class CreateStickies < ActiveRecord::Migration
  def change
    create_table :stickies do |t|
      t.string :name
      t.text :text
      t.string :link
      t.string :color
      t.references :column, index: true
      t.references :row, index: true

      t.timestamps
    end
  end
end
