def mock_json(name)
  File.read File.join Rails.root, 'test', 'support', 'json', "#{name}.json"
end
