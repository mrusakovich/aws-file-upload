# frozen_string_literal: true

class UploadCommand < Struct.new(:bucket)
  Failed = Class.new(StandardError)

  def execute
    s3_client = Aws::S3::Client.new

    Parallel.map(bucket.files, in_threads: 8) do |file|
      s3_client.put_object(
        bucket: bucket_name,
        key: file.original_filename,
        body: file.read,
        acl: 'public-read')
      [file.original_filename, "https://#{bucket_name}.s3.#{region}.amazonaws.com/#{file.original_filename}"]
    end

  rescue
    raise Failed
  end

  private

  def bucket_name = ENV['AWS_BUCKET_NAME']
  def region = ENV['AWS_REGION']
end
