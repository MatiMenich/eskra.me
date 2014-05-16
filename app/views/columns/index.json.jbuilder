json.array!(@columns) do |column|
  json.extract! column, :id, :name, :order, :board_id
  json.url column_url(column, format: :json)
end
