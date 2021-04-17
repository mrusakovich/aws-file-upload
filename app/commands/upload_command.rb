# frozen_string_literal: true

class UploadCommand < Struct.new(:file)
  def execute
    upload = Upload.find_or_create_by!(name: File.basename(file.original_filename))

    begin
      upload.transaction do
        upload.process!

        Aws::S3::Client.new.put_object(
          bucket: bucket_name,
          key: upload.name,
          body: file.read,
          acl: 'public-read'
        )

        upload.url = "https://#{bucket_name}.s3.#{region}.amazonaws.com/#{upload.name}"
        upload.success!
      end
    rescue => exc
      upload.message = exc.to_s
      upload.error!
    end

    upload
  end

  private

  def bucket_name = ENV['AWS_BUCKET_NAME']
  def region = ENV['AWS_REGION']
end
