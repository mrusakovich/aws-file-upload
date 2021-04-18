class UploadSerializer < Struct.new(:upload)
  def serialize(_ = {})
    { id: upload.id, attributes: upload }
  end

  alias :as_json :serialize
end
