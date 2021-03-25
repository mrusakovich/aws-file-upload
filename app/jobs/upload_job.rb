# frozen_string_literal: true

class UploadJob < ApplicationJob
  queue_as :default
  sidekiq_options retry: false

  def perform(file_path)
    payload = OpenStruct.new({
      file_name: File.basename(file_path),
      file_path: file_path,
      bucket_name: ENV['AWS_BUCKET_NAME'],
      region: ENV['AWS_REGION']
    })

    ProcessCommand.new(payload, Broadcaster.new, Renderer.new).execute
  end
end
