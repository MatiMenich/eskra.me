json.array!(@boards) do |board|
  json.extract! board, :id, :name, :uid, :created_at, :updated_at
  json.url board_url(board, format: :json)
end
