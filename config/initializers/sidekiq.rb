Sidekiq.configure_server do |config|
  if ENV['REDIS_SERVICE']
    config.redis = { url: ENV['REDIS_SERVICE'] }
  end
end

Sidekiq.configure_client do |config|
  if ENV['REDIS_SERVICE']
    config.redis = { url: ENV['REDIS_SERVICE'] }
  end
end
