# Phase 1: User Authentication, Basic Blogs and Posts

## Rails
### Models
* User
* Review
* Gear
* Product

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::ReviewsController (index)
* Api::GearsController (index)
* Api::ProductsController(index)

### Views
* users/new.html.erb
* session/new.html.erb
* reviews/index.json.jbuilder
* gears/index.json.jbuilder
* products/index.json.jbuilder

## Backbone
### Models
* Review
* Gear
* Product

### Collections
* Reviews
* Gears
* Products

### Views
* RootIndex ( Composite encompassing review/gear/product index )
* ReviewsIndex( Composite encompassing ReviewItem )
* GearsIndex( Composite encompassing GearItem )
* ProductsIndex( Composite encompassing ProductItem )
* ReviewItem
* GearItem
* ProductItem


## Gems/Libraries
