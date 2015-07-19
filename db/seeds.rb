# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


users = User.create!([{
 username: "waiphyo300", email: "waiphyo300@gmail.com", password_digest: BCrypt::Password.create("wpm123")
},{
 username: "kate123", email: "kate123@gmail.com", password_digest: BCrypt::Password.create("kate123")
},{
 username: "bob123", email: "bob123@gmail.com", password_digest: BCrypt::Password.create("bob123")
}])

products = Product.create!([{
  name: "Sennheiser HD800", avg_score: 10, category: "Headphones",info: "More than 60 years of ingenious headphone engineering has been applied to the new HD 800.
  Incorporating Sennheiser's most advanced driver technology, these open, around-the-ear, dynamic stereo headphones redefine what reference-grade audio is all about.
  The HD 800 is hand-assembled in Germany with only the finest of materials.
  The transducer is encased in a precision material made of stainless steel, while the headband and headphone mounting utilizes the most advanced development from the aerospace industry.",image_url: "http://en-us.sennheiser.com/images/718/all/square/5563/square_louped_hd_800_01_sq_high_end_sennheiser.png"
  },{
  name: "Grado PS1000e",category: "Headphones",info: "Signature immediacy and deep tonal lushness characterize these top-of-the-line headphones featuring a gently tipped-up bass and treble response plus
  a coherent, immediate midrange that makes the PS1000e a true joy to hear with vocal music and singer/songwriter fare.",image_url: "http://cdn.shopify.com/s/files/1/0362/2465/products/PS1000e_1024x1024.jpg?v=1422644094"
  },{
  name: "Bose QuietComfort 25", category: "Headphones",info: "The QuietComfort 25 model takes Bose's already stellar noise-canceling headphones and levels them up to new heights.",image_url: "http://cnet1.cbsistatic.com/hub/i/r/2014/09/16/f5e0c1d9-68cf-4a00-8c1b-660b66730386/thumbnail/770x433/1b56e963a6be9b38f22249b3557de407/bose-quietcomfort-25-product-photos10.jpg"
  },{
  name: "Audiotechnica ATH M-50X", category: "Headphones",info: "As the most critically acclaimed model in the M-Series line, the ATH-M50 is praised by top audio engineers and pro audio reviewers year after year. Now, the ATH-M50x professional monitor headphones feature the same coveted sonic signature, with the added feature of detachable cables. From the large aperture drivers, sound isolating earcups and robust construction, the M50x provides an unmatched experience for the most critical audio professionals.",image_url: "http://www.audio-technica.com/cms/resource_library/product_images/1c085475de0d3272/med/ath_m50x_2_sq.jpg"
  },{
  name: "Sennheiser HD700", category: "Headphones", avg_score: 7,info: "These awesome, open circumaural headphones with tuned, highly-efficient drivers and only the finest acoustic materials will please even the most discriminating audiophile. They also look and feel great.",image_url: "http://en-us.sennheiser.com/images/1511/all/square/5566/square_louped_hd_700_01_sq_sennheiser.png"
  },{
  name: "Audioquest Dragonfly", category: "DAC",info: "A USB digital to analog converter that bypassess your computer's weak sound card and provides sweet sound signal into your headphones", image_url: "http://cdn.stereophile.com/images/styles/600_wide/public/1012dragon.promo_.jpg?itok=AiMBhjee"
  },{
  name: "Woo Audio WA7",category: "Amplifier", info: "The Woo Audio WA7 “Fireflies” Amp/DAC is a combination of high performance vacuum tube headphone amplifier with a built-in USB Digital-to-Analog Converter. It is a pure tube design, utilizing 6C45 tubes in a class-A, single-ended topology, with transformer coupled outputs. There are no semiconductors used in the entire amplification path. The D-A converter is designed to be capable of up to 32-bit/192k sampling rates. This maintains pure data integrity, which is transmitted via standard high speed USB 2.0 interface operating in asynchronous mode.", image_url: "data:image/jpeg;base64,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"
    }])

gears = Gear.create!([{
  owner_id: 1, title: "Classical Music", impression: "Great pairing for classical music", image_url: "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s306x306/e15/11024378_556543914487500_810834771_n.jpg"
  }])

gearstoproducts = Geartopro.create!([{
  gear_id: 1, product_id: 1
  },{
  gear_id: 1, product_id: 2
  }])


collections = Collection.create!([{
  owner_id: 1, title: "Hunt for airy open sound"
  },{
  owner_id: 1, title: "Bass monsters"
  }])

producttocollections = Producttocol.create!([{
  product_id: 1, collection_id: 1
  },{
  product_id: 5, collection_id: 1
  },{
  product_id: 3, collection_id: 2
  }])

geartocollections = Geartocol.create!([{
  gear_id: 1, collection_id: 1
  }])

reviews = Review.create!([{
   owner_id: 1, product_id: 1,title: "The King Of SoundStage", description: "Amazing headphones. Makes you feel like you are in a concert hall. You definitely need a beefy amplifier for these precious cans.", score: 10
   },{
   owner_id: 2, product_id: 1, title: "Best In The World", description: "I have never listended to a better pair of cans. They are just smooth and rich and pitch-perfect and involving. Pairs well with Woo Audio 7 Tube Amp", score: 10
   }])

comments = Comment.create!([{
  author_id: 1, parent_id: 1, parent_type: "Review", content: "Check out my review people :)"
  }])

follows = Follow.create!([{
  follower_id: 2, followee_id: 1
  },{
  follower_id: 3, followee_id: 1
  },{
  follower_id: 1, followee_id: 2
  }])

  reviewtousers = Reviewtouser.create!([{
    review_id: 1, upvoter_id: 2
    },{
    review_id: 2, upvoter_id: 3
    }])

  geartousers = Geartouser.create!([{
    gear_id: 1, subscriber_id: 2
    },{
    gear_id: 1, subscriber_id: 3
    }])
