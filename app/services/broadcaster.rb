# frozen_string_literal: true

class Broadcaster
  def broadcast(key, template)
    ActionCable.server.broadcast('uploads', { key: key, template: template })
  end
end
