# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique


## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
product_id  | integer   | not null, foreign key (references products)
title       | integer   | not null
description | text      | not null
score       | integer   | not null
helpfulness | integer   | default zero


## gears
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
impression  | text      | not null
image_url   | string    | not null
popularity  | integer   | default zero



## products
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
image_url   | string    | not null
name        | string    | not null, unique
category    | string    | not null
info        | text      | not null
avg_score   | integer   | default zero ( will be updated whenever a user enters a review for this product)


## collections
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foregin_key(references to users)
image_url   | string    | default will point to a plain image
title       | string    | not null


## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foregin_key( points to parent user )
body        | string    | not null
gear_id     | integer   | foreign_key ( points to a parent gear)
product_id  | integer   | foreign_key ( points to a parent product)
review_id   | integer   | foreign_key ( points to a parent review)


## gears to collections ( many to many )
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
gear_id      | integer   | not null
collection_id| integer   | not null



## products to collections ( many to many )
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
product_id   | integer   | not null
collection_id| integer   | not null


## gears to products (many to many)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
gear_id     | integer   | not null
product_id  | integer   | not null


## gears to users that favorite the gears( many to many )
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
gear_id      | integer   | not null
subscriber_id| integer   | not null

## reviews to users that upvote the reviews ( many to many )
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
review_id   | integer   | not null
upvoter_id  | integer   | not null

## users to users ( many to many )
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null
followee_id | integer   | not null
