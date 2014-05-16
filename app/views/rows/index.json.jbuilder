json.array!(@rows) do |row|
  json.extract! row, :id, :name, :order, :board_id
  json.url row_url(row, format: :json)
end
