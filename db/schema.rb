# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140527035440) do

  create_table "boards", force: true do |t|
    t.string   "name"
    t.string   "uid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "columns", force: true do |t|
    t.string   "name"
    t.integer  "order"
    t.integer  "board_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "columns", ["board_id"], name: "index_columns_on_board_id"

  create_table "rows", force: true do |t|
    t.string   "name"
    t.integer  "order"
    t.integer  "board_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rows", ["board_id"], name: "index_rows_on_board_id"

  create_table "stickies", force: true do |t|
    t.string   "name"
    t.text     "text"
    t.string   "url"
    t.string   "color"
    t.integer  "column_id"
    t.integer  "row_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "stickies", ["column_id"], name: "index_stickies_on_column_id"
  add_index "stickies", ["row_id"], name: "index_stickies_on_row_id"

end
