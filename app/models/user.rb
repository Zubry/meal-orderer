class User < ApplicationRecord
  has_many :orders
  has_many :meals
  
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
      user.email = auth.info.email
      user.uid = auth.uid
      user.provider = auth.provider
      user.avatar_url = auth.info.image
      user.username = auth.info.name
      user.oauth_token = auth.credentials.token
      user.save!
    end
  end

  def self.from_authtoken(auth)
    if !auth
      return :unauthorized
    else
      u = find_by(oauth_token: auth)
      u.nil? ? :unauthorized : u
    end
  end
end
