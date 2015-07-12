# SonicHunt



## Minimum Viable Product

SonicHunt is a meeting place for headphone/DAC/amplifier enthusiasts.

The design is inspired by ProductHunt.

Main items of the website will be

Products: headphones/DAC/amplifiers

Reviews: Users' detailed reviews of products

Gears: Users' collection of colorful headphones and/or amplifier and/or DAC stacks, and the owners' impressions on the gears' performance

Users can:
<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Follow other users
- [ ] Create product reviews
- [ ] Create gears
- [ ] Have their personal page
- [ ] Comment on others' reviews and gears
- [ ] View products, reviews, gears and other users' pages
- [ ] Favorite gears
- [ ] Vote up/down for a review
- [ ] Search for products, reviews and gears by product name
- [ ] View a feed of gears that contain a product sorted by popularity
- [ ] View a feed of product reviews for a product sorted by helpfulness of review

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Review/Gear/Product Index (~1 day)
I will implement user authentication in Rails based on the practices learned at App Academy.
I will add API routes to serve review, product and gear data as JSON, then add Backbone models and collections that fetch data from those routes.
Review collection will have a comparator that sorts by helpfulness.
Gear collection will have a comparator that sorts by
popularity.
I will first seed a few sample products, reviews and gears in the database and test out the index view.
The index view current should simultaneously display lists of
reviews, gears and products ( which I will design at a later point). They will be subviews of a compostie RootView, and they will also have their subviews ( individual list item ).
At the end of day1, I will be pushing the app to Heroku and ensure that authentication and index view work.


[Details][phase-one]

### Phase 2: Delete/ New form/ Edit form and show pages  (~1-2 days)
I will implement delete functionality for reviews and gears
from their indexViews.
I will also implement forms for creating/ editing reviews and gears.
I will prepopulate products so that in the review/gear forms, users can select which product to review or stack as a gear.
In the forms, I plan to use filepicker.io for uploading images.
I will also implement show page for reviews, gears and products.
By the end of this phase, users will be able to create/edit reviews/gears for products of their choice using Backbone form views, which on completion will redirect to the index page of their respective models. Users will also be able to click on
individual list item on the index view which will take them to the show page of that item.

[Details][phase-two]

### Phase 3: Follow, Favorite, Upvote Functionality and User Pages (~1-2 days)
I will implement the functionality of users being able to click
follow, favorite and upvote buttons and the associated attributes for the respective models being saved.
Then,I will implement user's show pages which will hold subviews for their reviews, gears, favorites, upvotes, followers and followees.

[Details][phase-three]

### Phase 4: Comments (~0.5 - 1 day)
I will implement comment functionality for the show pages of
reviews and gears. Users will be able to add new comment and
edit comment right on the show page of the comment's parent model. They will also be able to delete their own comments.

[Details][phase-four]

### Phase 5: Search Functionality (~2 days)
I will add search functionality to the root index page I implemented in Phase 1. In the rootindex View, I will have a
search bar, which on search completion ("keypress enter") will trigger a new restricted fetch on the respective collections of reviews, gears and products, and re-render the whole rootindex page again.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] User avatars
- [ ] Complete styling with Bootstrap
- [ ] Thumbnails on item views
- [ ] Product Trades/ Sales
- [ ] Typeahead search bar
- [ ] Pagination/infinite scroll
- [ ] Activity history
- [ ] Multiple sessions/session management

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
