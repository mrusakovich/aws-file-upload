module Api
  module V1
    class UploadsController < ApplicationController
      def create
        upload = UploadCommand.new(file).execute
        render json: to_data(UploadSerializer.new(upload))
      end

      def index
        collection = Upload.all.map { |upload| UploadSerializer.new(upload) }
        render json: to_data(collection)
      end

      def clear
        deleted = Upload.delete_all
        render json: to_data({ count: deleted })
      end
    
      private
    
      def file
        params.require(:file)
      end

      def to_data(input)
        { data: input }
      end
    end    
  end
end
