opts = { scope: 'user:email' }

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, ENV['github_client_id'], ENV['github_client_secret'], opts

  # provider :github, Rails.application.secrets.github_client_id, Rails.application.secrets.github_client_secret, opts
end
