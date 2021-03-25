class UploadsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "uploads"
  end
end
