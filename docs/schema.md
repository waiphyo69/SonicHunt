# Schema Information

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
product_id  | integer   | not null, foreign key (references products)
description | string    | not null
score       | integer   | not null
helpfulness | integer   | default zero


## gears
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
impression  | string    | not null
image_url   | string    | not null
popularity  | integer   | default zero


## gearstoproducts  
(many to many)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
gear_id     | integer   | not null
product_id  | integer   | not null


## products
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, unique
info        | string    | not null
image_url   | string    | not null



## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
favorite_id     | integer   | foreign key ( references gears )
upvote_id       | integer   | foreign key ( references reviews )
follower_id     | integer   | foreign key ( references users)
followee_id     | integer   | foreign key ( references users )
