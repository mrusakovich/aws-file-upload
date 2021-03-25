class BucketController < ApplicationController
  def upload
    bucket = Bucket.new(bucket_params.to_h)
    UploadCommand.new(bucket).execute
    redirect_to uploads_path
  end

  def clear
    Upload.delete_all
    redirect_to root_path
  end

  private

  def bucket_params
    params.require(:bucket).permit(files: [])
  end
end
