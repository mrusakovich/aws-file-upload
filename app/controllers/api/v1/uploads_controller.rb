module Api
  module V1
    class UploadsController < ApplicationController
      def create
        upload = UploadCommand.new(file).execute
        render json: upload
      end
    
      def clear
        Upload.delete_all
        head :ok
      end
    
      private
    
      def file
        params.require(:file)
      end
    end    
  end
end
