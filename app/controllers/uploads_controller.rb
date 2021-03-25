class UploadsController < ApplicationController
  def index
    render locals: { list: Upload.all }
  end
end
