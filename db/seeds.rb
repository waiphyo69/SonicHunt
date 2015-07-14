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
  name: "Sennheiser HD800", category: "Headphones",info: "More than 60 years of ingenious headphone engineering has been applied to the new HD 800.
  Incorporating Sennheiser's most advanced driver technology, these open, around-the-ear, dynamic stereo headphones redefine what reference-grade audio is all about.
  The HD 800 is hand-assembled in Germany with only the finest of materials.
  The transducer is encased in a precision material made of stainless steel, while the headband and headphone mounting utilizes the most advanced development from the aerospace industry.",image_url: "http://en-us.sennheiser.com/images/718/all/square/5563/square_louped_hd_800_01_sq_high_end_sennheiser.png"
  },{
  name: "Grado PS1000e", category: "Headphones",info: "Signature immediacy and deep tonal lushness characterize these top-of-the-line headphones featuring a gently tipped-up bass and treble response plus
  a coherent, immediate midrange that makes the PS1000e a true joy to hear with vocal music and singer/songwriter fare.",image_url: "http://cdn.shopify.com/s/files/1/0362/2465/products/PS1000e_1024x1024.jpg?v=1422644094"
  },{
  name: "Bose QuietComfort 25", category: "Headphones",info: "The QuietComfort 25 model takes Bose's already stellar noise-canceling headphones and levels them up to new heights.",image_url: "http://cnet1.cbsistatic.com/hub/i/r/2014/09/16/f5e0c1d9-68cf-4a00-8c1b-660b66730386/thumbnail/770x433/1b56e963a6be9b38f22249b3557de407/bose-quietcomfort-25-product-photos10.jpg"
  },{
  name: "Audiotechnica ATH M-50X", category: "Headphones",info: "As the most critically acclaimed model in the M-Series line, the ATH-M50 is praised by top audio engineers and pro audio reviewers year after year. Now, the ATH-M50x professional monitor headphones feature the same coveted sonic signature, with the added feature of detachable cables. From the large aperture drivers, sound isolating earcups and robust construction, the M50x provides an unmatched experience for the most critical audio professionals.",image_url: "http://www.audio-technica.com/cms/resource_library/product_images/1c085475de0d3272/med/ath_m50x_2_sq.jpg"
  },{
  name: "Sennheiser HD700", category: "Headphones",info: "These awesome, open circumaural headphones with tuned, highly-efficient drivers and only the finest acoustic materials will please even the most discriminating audiophile. They also look and feel great.",image_url: "http://en-us.sennheiser.com/images/1511/all/square/5566/square_louped_hd_700_01_sq_sennheiser.png"
  },{
  name: "Audioquest Dragonfly", category: "DAC",info: "A USB digital to analog converter that bypassess your computer's weak sound card and provides sweet sound signal into your headphones", image_url: "http://cdn.stereophile.com/images/styles/600_wide/public/1012dragon.promo_.jpg?itok=AiMBhjee"
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
