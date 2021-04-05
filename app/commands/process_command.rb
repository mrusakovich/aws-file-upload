# frozen_string_literal: true

class ProcessCommand < Struct.new(:payload, :broadcaster, :renderer)
  delegate :upload_id, :bucket_name, :region, to: :payload

  MissingSource = Class.new(StandardError)

  def execute
    raise MissingSource unless File.exists?(upload.path)

    Aws::S3::Client.new.put_object(
      bucket: bucket_name,
      key: upload.name,
      body: file.read,
      acl: 'public-read'
    )

    upload.url = "https://#{bucket_name}.s3.#{region}.amazonaws.com/#{upload.name}"
    upload.message = 'successful upload'
  rescue MissingSource => e
    upload.message = 'source file is missing'
  rescue StandardError => e
    upload.message = e.message
  ensure
    File.unlink(file) rescue nil # keep reading
    upload.save!
    broadcaster.broadcast(upload.name, renderer.render(upload))
  end

  private

  def upload = @upload ||= Upload.find(upload_id)
  def file = @file ||= File.new(upload.path)
end
