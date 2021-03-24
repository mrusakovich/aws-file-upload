class BucketController < ApplicationController
  rescue_from UploadCommand::Failed, with: :upload_failed

  def upload
    bucket = Bucket.new(bucket_params.to_h)
    render locals: { result: UploadCommand.new(bucket).execute }
  end

  private

  def bucket_params
    params.require(:bucket).permit(files: [])
  end

  def upload_failed(exception)
    byebug
  end
end
