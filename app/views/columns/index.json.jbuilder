json.array!(@columns) do |column|
  json.extract! column, :id, :name, :column_order, :board_id
  json.url column_url(column, format: :json)
end
