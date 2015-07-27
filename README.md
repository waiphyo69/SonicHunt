# SonicHunt


http://www.sonichunt.com


SonicHunt is a meeting place for headphone/DAC/amplifier enthusiasts.
The design is inspired by ProductHunt.

Main items of the website will be

Products: headphones/DAC/amplifiers

Reviews: Users' detailed reviews of products

Gears: Users' own set of colorful headphones and/or amplifier and/or DAC stacks, and the owners' impressions on the gears' performance

Collections: Users' collection of individual products or gears based on
music genres, music tastes and ear preferences ( they do not need to
  own the product or gear for this)

Users can look through products, submit reviews and vote other user's reviews.
Users can submit and showoff their own gears, upload gear pics, comment on other users' gears and look through gears on the index page.
Users can collect products and gears in their collections.

# Rails Back End

## Associations

  - Polymorphic association for comments whose parents can be either reviews or gears
  - Defined the inverse associations for faster query performance


# Backbone Front End

## Signin/ Signup Page

### Features  

  - Guest Login
  - Facebook Login
  - Users can create new accounts

### Technical

  - Creates a user and logs her in on guest login
  - Ominauth Facebook Login
  - SignUp creates new users and saves them in the database


## Index Page

### Features

  - Dynamic multiparameter search
  - Live upvote/downvote of gears
  - Collectable products and gears
  - Can creat gears on gear index section

### Technical

  - Manually wrote live dynamic search which fetches products, gears and collections which matches the search value not only by title but also by other second level attributes ( such as product category, products contained in the gears/collections ) which were sent through
  jbuilder files to the respective models in which the respective associations and methods were defined.

  - Index page is a compostie view containing products index subview, gears index subview and collections index subview which in turn contains item subviews for each model.


  - Users can create gears through a gear form view which on submit saves the gear itself and its associated many-to-many associations with products.

## Product Show Page

### Features

  - Shows reviews for the particular product
  - The reviews list items are clickable which will take users to review show page
  - Users can edit/delete/create reviews
  - Product's average rating gets updated whenever users submit a review without having to refresh

### Technical

  - Product show page is a composite view that holds the information of product itself and contains         subviews of review items
  - Dynamic modal forms for creating and editing reviews
  - Product show page is automatically rendered after users edit/create/delete reviews due to listeners

## Review Show Page

### Features

  - Shows review details
  - Users can comment on the review

### Technical  

  - Comment edits/reviews/deletes get instantly updated due to listeners for change in attributes and removing subviews immediately once comments are deleted

## Gear Show Page

### Features

  - Shows gear information
  - Shows all the products the gear consists of which are clickable ( redirects to product show page)
  - Users can comment on the gear

### Technical

  - Data for products for the particular gear are sent up through jbuilder file to avoid n+1 queries   when rendering the page

## Collection Show Page

### Features

  - Shows collection information
  - Shows all the products the user collected for the collection
