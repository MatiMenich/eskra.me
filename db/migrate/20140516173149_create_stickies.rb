class CreateStickies < ActiveRecord::Migration
  def change
    create_table :stickies do |t|
      t.text :name
      t.text :text
      t.text :url
      t.text :color
      t.references :column, index: true
      t.references :row, index: true

      t.timestamps
    end
  end
end
