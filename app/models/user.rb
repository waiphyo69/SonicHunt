class User < ActiveRecord::Base

  EMAIL_FORMAT = /^([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})$/i

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, :password_digest, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, length: { maximum: 15 }
  validates_format_of :email, with: EMAIL_FORMAT, multiline: true

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :follower_follows,
  foreign_key: :followee_id,
  class_name: "Follow",
  inverse_of: :followee

  has_many :followers,
  through: :follower_follows,
  source: :follower

  has_many :followee_follows,
  foreign_key: :follower_id,
  class_name: "Follow",
  inverse_of: :follower

  has_many :followees,
  through: :followee_follows,
  source: :followee

  has_many :gear_ids,
  foreign_key: :subscriber_id,
  class_name: "Geartouser",
  inverse_of: :subscriber

  has_many :favorite_gears,
  through: :gear_ids,
  source: :gear

  has_many :review_ids,
  foreign_key: :upvoter_id,
  class_name: "Reviewtouser",
  inverse_of: :upvoter

  has_many :upvoted_reviews,
  through: :review_ids,
  source: :review

  has_many :collections,
  foreign_key: :owner_id,
  class_name: "Collection",
  inverse_of: :owner

  has_many :gears,
  foreign_key: :owner_id,
  class_name: "Gear",
  inverse_of: :owner

  has_many :reviews,
  foreign_key: :owner_id,
  class_name: "Review",
  inverse_of: :owner

  has_many :reviewed_product,
  through: :reviews,
  source: :product

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end


  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
