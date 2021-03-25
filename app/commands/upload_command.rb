# frozen_string_literal: true

class UploadCommand < Struct.new(:bucket)
  def execute
    bucket.files.each do |file|
      File.open(Rails.root.join('tmp', 'uploads', file.original_filename), 'w', binmode: true) do |out|
        out.write(file.read)
        UploadJob.perform_later(out.path)
      end
    end
  end
end
