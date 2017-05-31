module Settings
  def settings(options, &block)
    with_options options, &block
  end

  def setting(key, encrypted: false, column: :settings)
    if encrypted
      define_method(key.to_sym) { decrypt self[column]["encrypted_#{key}"] }
      define_method("#{key}=".to_sym) do |value|
        self[column]["encrypted_#{key}"] = encrypt(value)
      end
    else
      define_method(key.to_sym) { self[column][key.to_s] }
      define_method("#{key}=".to_sym) do |value|
        self[column][key.to_s] = value
      end
    end
  end
end
