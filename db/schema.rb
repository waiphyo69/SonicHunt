# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150714185447) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collections", force: :cascade do |t|
    t.integer  "owner_id",                                                                                                                       null: false
    t.string   "image_url",  default: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZ5aDVyllZi1iiTJ0dr7fY2ig6xVGswpkTv7MEy8WTqwpkNHA"
    t.string   "title",                                                                                                                          null: false
    t.datetime "created_at",                                                                                                                     null: false
    t.datetime "updated_at",                                                                                                                     null: false
  end

  add_index "collections", ["owner_id"], name: "index_collections_on_owner_id", using: :btree
  add_index "collections", ["title"], name: "index_collections_on_title", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "follower_id", null: false
    t.integer  "followee_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "follows", ["followee_id"], name: "index_follows_on_followee_id", using: :btree
  add_index "follows", ["follower_id", "followee_id"], name: "index_follows_on_follower_id_and_followee_id", unique: true, using: :btree
  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree

  create_table "gears", force: :cascade do |t|
    t.integer  "owner_id",               null: false
    t.string   "title",                  null: false
    t.text     "impression",             null: false
    t.string   "image_url",              null: false
    t.integer  "popularity", default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "gears", ["owner_id"], name: "index_gears_on_owner_id", using: :btree

  create_table "geartocols", force: :cascade do |t|
    t.integer  "gear_id"
    t.string   "collection_id"
    t.string   "integer"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "geartocols", ["collection_id"], name: "index_geartocols_on_collection_id", using: :btree
  add_index "geartocols", ["gear_id", "collection_id"], name: "index_geartocols_on_gear_id_and_collection_id", unique: true, using: :btree
  add_index "geartocols", ["gear_id"], name: "index_geartocols_on_gear_id", using: :btree

  create_table "geartopros", force: :cascade do |t|
    t.integer  "gear_id",    null: false
    t.integer  "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "geartopros", ["gear_id", "product_id"], name: "index_geartopros_on_gear_id_and_product_id", unique: true, using: :btree
  add_index "geartopros", ["gear_id"], name: "index_geartopros_on_gear_id", using: :btree
  add_index "geartopros", ["product_id"], name: "index_geartopros_on_product_id", using: :btree

  create_table "geartousers", force: :cascade do |t|
    t.integer  "gear_id",       null: false
    t.integer  "subscriber_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "geartousers", ["gear_id", "subscriber_id"], name: "index_geartousers_on_gear_id_and_subscriber_id", unique: true, using: :btree
  add_index "geartousers", ["gear_id"], name: "index_geartousers_on_gear_id", using: :btree
  add_index "geartousers", ["subscriber_id"], name: "index_geartousers_on_subscriber_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.string   "image_url",              null: false
    t.string   "name",                   null: false
    t.string   "category",               null: false
    t.text     "info",                   null: false
    t.integer  "avg_score",  default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "products", ["name"], name: "index_products_on_name", unique: true, using: :btree

  create_table "producttocols", force: :cascade do |t|
    t.integer  "product_id",    null: false
    t.integer  "collection_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "producttocols", ["collection_id"], name: "index_producttocols_on_collection_id", using: :btree
  add_index "producttocols", ["product_id", "collection_id"], name: "index_producttocols_on_product_id_and_collection_id", unique: true, using: :btree
  add_index "producttocols", ["product_id"], name: "index_producttocols_on_product_id", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.integer  "owner_id",                null: false
    t.integer  "product_id",              null: false
    t.text     "description",             null: false
    t.integer  "score",                   null: false
    t.integer  "helpfulness", default: 0
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "title",                   null: false
  end

  add_index "reviews", ["owner_id", "product_id"], name: "index_reviews_on_owner_id_and_product_id", unique: true, using: :btree
  add_index "reviews", ["owner_id"], name: "index_reviews_on_owner_id", using: :btree
  add_index "reviews", ["product_id"], name: "index_reviews_on_product_id", using: :btree

  create_table "reviewtousers", force: :cascade do |t|
    t.integer  "review_id",  null: false
    t.integer  "upvoter_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "reviewtousers", ["review_id", "upvoter_id"], name: "index_reviewtousers_on_review_id_and_upvoter_id", unique: true, using: :btree
  add_index "reviewtousers", ["review_id"], name: "index_reviewtousers_on_review_id", using: :btree
  add_index "reviewtousers", ["upvoter_id"], name: "index_reviewtousers_on_upvoter_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["password_digest"], name: "index_users_on_password_digest", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
