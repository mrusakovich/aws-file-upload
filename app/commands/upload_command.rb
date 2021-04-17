# frozen_string_literal: true

class UploadCommand < Struct.new(:file)
  def execute
    
  end

  private

  def direct_upload
  end

  def delayed_upload
    File.open(Rails.root.join('tmp', 'uploads', file.original_filename), 'w', binmode: true) do |out|
      file.to_io.each do |bytes|
        out.write(bytes)
      end

      upload = Upload.create!(path: out.path, name: File.basename(out.path), message: 'processing...')
      UploadJob.perform_later(upload.id)
    end
  end
end
