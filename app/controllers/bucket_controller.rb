class BucketController < ApplicationController
  def upload
    UploadCommand.new(file).execute
    head :ok
  end

  def clear
    Upload.delete_all
    redirect_to root_path
  end

  private

  def file
    params.require(:file)
  end
end
