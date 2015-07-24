class User < ActiveRecord::Base

  EMAIL_FORMAT = /^([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})$/i

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, :password_digest, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, length: { maximum: 15 }
  validates_format_of :email, with: EMAIL_FORMAT, multiline: true

  attr_reader :password

  after_initialize :ensure_session_token


  has_attached_file :image,
  default_url: "http://avatars-cdn.producthunt.com/267114/220?1437407114"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

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

  has_many :subscribeds,
  foreign_key: :subscriber_id,
  class_name: "Geartouser",
  inverse_of: :subscriber

  has_many :favorite_gears,
  through: :gear_ids,
  source: :gear

  has_many :upvoteds,
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

  has_many :comments,
  foreign_key: :owner_id,
  class_name: "Comment",
  inverse_of: :author

  has_many :reviewed_product,
  through: :reviews,
  source: :product

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.password_digest.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password_digest
    BCrypt::Password.new(super)
  end

  def follower_hash
    zipped_follows = followee_follows.pluck(:follower_id).zip(followee_follows)
    follows_hash = {}
    zipped_follows.each do |(id, follow)|
      follows_hash[id] = follow
    end

    follows_hash
  end

  def followee_hash
    zipped_follows = follower_follows.pluck(:followee_id).zip(follower_follows)
    follows_hash = {}
    zipped_follows.each do |(id, follow)|
      follows_hash[id] = follow
    end

    follows_hash
  end

  def review_upvote_hash
    zipped_upvoted_reviews = upvoteds.pluck(:review_id).zip(upvoteds)
    reviews_hash = {}
    zipped_upvoted_reviews.each do |(id, review)|
      reviews_hash[id] = review
    end

    reviews_hash
  end

  def gear_upvote_hash
    zipped_upvoted_gears = subscribeds.pluck(:gear_id).zip(subscribeds)
    gears_hash = {}
    zipped_upvoted_gears.each do |(id, gear)|
      gears_hash[id] = gear
    end

    gears_hash
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
  end

   def self.find_or_create_by_auth_hash(auth_hash)
     user = User.find_by(
              provider: auth_hash[:provider],
              uid: auth_hash[:uid])

      unless user

        user = User.create!(
              provider: auth_hash[:provider],
              uid: auth_hash[:uid],
              username: auth_hash[:info][:name].split(' ').first,
              email: auth_hash[:info][:name].split(' ').first + '@gmail.com',
              # email: auth_hash[:info][:name].split(' ').first+'@gmail.com',
              password: SecureRandom::urlsafe_base64)
            end

      user

    end
end
