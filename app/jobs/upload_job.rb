# frozen_string_literal: true

class UploadJob < ApplicationJob
  queue_as :default
  sidekiq_options retry: false

  def perform(upload_id)
    payload = OpenStruct.new({
      upload_id: upload_id,
      bucket_name: ENV['AWS_BUCKET_NAME'],
      region: ENV['AWS_REGION']
    })

    ProcessCommand.new(payload, Broadcaster.new, Renderer.new).execute
  end
end
