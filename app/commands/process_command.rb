# frozen_string_literal: true

class ProcessCommand < Struct.new(:payload, :broadcaster, :renderer)
  delegate :file_name, :file_path, :bucket_name, :region, to: :payload

  MissingSource = Class.new(StandardError)

  def execute
    raise MissingSource unless File.exists?(file_path)

    Aws::S3::Client.new.put_object(
      bucket: bucket_name,
      key: file_name,
      body: file.read,
      acl: 'public-read'
    )

    upload.url = "https://#{bucket_name}.s3.#{region}.amazonaws.com/#{file_name}"
  rescue MissingSource => e
    upload.error = 'source file is missing'
  rescue StandardError => e
    upload.error = e.message
  ensure
    File.unlink(file) rescue nil # keep reading
    upload.save!
    broadcaster.broadcast(upload.name, renderer.render(upload))
  end

  private

  def upload = @upload ||= Upload.find_or_initialize_by(name: file_name)
  def file = @file ||= File.new(file_path)
end
