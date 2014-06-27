json.array!(@stickies) do |sticky|
  json.extract! sticky, :id, :name, :text, :link, :color, :column_id, :row_id
  json.url sticky_url(sticky, format: :json)
end
