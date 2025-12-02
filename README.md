# BanglaBatash BNB 🏡

A full-stack Airbnb-inspired vacation rental platform built with the MERN stack. BanglaBatash BNB allows users to browse, create, manage property listings, leave reviews, and explore locations through interactive maps.

# LIVE LINK
https://banglabatash-bnb.onrender.com/listings
![NOTE] It can take up to a minute it to get back online due to inactivity.



## 🌟 Features

### Core Functionality
- **Browse Listings**: View all available vacation rental properties with category filters
- **Detailed Property View**: Comprehensive details including description, price, location, owner info, and interactive map
- **User Authentication**: Secure signup/login system with Passport.js
- **Authorization**: Only listing owners can edit or delete their properties
- **Create Listings**: Add new properties with image upload
- **Edit Listings**: Update existing property information
- **Delete Listings**: Remove properties with cascading review deletion

### Reviews & Ratings
- **Star-Based Rating System**: Interactive 5-star rating interface
- **Review Comments**: Leave detailed reviews for properties
- **Review Management**: Users can delete their own reviews
- **Aggregate Ratings**: View overall property ratings

### Advanced Features
- **Interactive Maps**: Mapbox integration with location markers and popups
- **Geocoding**: Automatic conversion of addresses to coordinates
- **Image Upload**: Cloudinary integration for image hosting and optimization
- **Image Preview**: Live preview when uploading images
- **Search Functionality**: Search listings by destination
- **Category Filters**: Filter by Trending, Rooms, Iconic Cities, Mountains, Castles, Pools, Camping, Farms, Arctic
- **Tax Toggle**: Show/hide tax information on listings
- **Flash Messages**: User feedback for all actions
- **Session Management**: Persistent login with MongoDB session store
- **Responsive Design**: Mobile-first approach with Bootstrap 5

## 🛠️ Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework (v5.1.0)
- **MongoDB**: NoSQL database with MongoDB Atlas cloud hosting
- **Mongoose**: MongoDB ODM for data modeling (v8.19.3)
- **Passport.js**: Authentication middleware with Local Strategy
- **Passport-Local-Mongoose**: Simplified user authentication

### Frontend
- **EJS**: Embedded JavaScript templating engine
- **EJS-Mate**: Layout support for EJS
- **Bootstrap 5**: Responsive UI framework
- **Starability.css**: CSS-only star rating system

### Cloud Services & APIs
- **Cloudinary**: Cloud-based image management
- **Mapbox**: Interactive maps and geocoding API
- **MongoDB Atlas**: Cloud-hosted MongoDB database

### Middleware & Utilities
- **Express-Session**: Session management with connect-mongo store
- **Connect-Flash**: Flash messages
- **Connect-Mongo**: MongoDB session store
- **Method-Override**: Support for PUT and DELETE in HTML forms
- **Multer**: File upload handling
- **Joi**: Server-side data validation
- **Dotenv**: Environment variable management

## 📁 Project Structure

```
BanglaBatash-BNB/
├── controllers/
│   ├── listings.js      # Listing route controllers
│   ├── reviews.js       # Review route controllers
│   └── users.js         # User authentication controllers
├── models/
│   ├── listing.js       # Listing schema with geocoding
│   ├── review.js        # Review schema
│   └── user.js          # User schema with passport-local-mongoose
├── routes/
│   ├── listing.js       # Listing routes
│   ├── review.js        # Review routes
│   └── user.js          # User authentication routes
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs  # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs       # Navigation bar
│   │   ├── footer.ejs       # Footer
│   │   └── flash.ejs        # Flash message display
│   ├── users/
│   │   ├── signup.ejs       # Signup form
│   │   └── login.ejs        # Login form
│   ├── listing.ejs          # All listings (Index)
│   ├── show.ejs             # Single listing detail page
│   ├── new.ejs              # Create new listing form
│   ├── edit.ejs             # Edit listing form
│   └── error.ejs            # Error page
├── public/
│   ├── css/
│   │   ├── style.css        # Main stylesheet
│   │   └── rating.css       # Star rating styles
│   └── js/
│       ├── script.js        # Client-side utilities
│       ├── listing.js       # Tax toggle functionality
│       └── map.js           # Mapbox integration
├── init/
│   ├── data.js              # Sample listing data
│   └── index.js             # Database seeding script
├── utilis/
│   ├── wrapAsync.js         # Async error handling wrapper
│   └── ExpressError.js      # Custom error class
├── schema.js                # Joi validation schemas
├── app.js                   # Main application file
├── .env                     # Environment variables
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## 🔌 API Routes

### Listing Routes
| Method | Route                | Description                    | Auth Required |
|--------|----------------------|--------------------------------|---------------|
| GET    | `/listings`          | Get all listings               | No            |
| GET    | `/listings/new`      | Show form to create listing    | Yes           |
| POST   | `/listings`          | Create a new listing           | Yes           |
| GET    | `/listings/:id`      | Show specific listing details  | No            |
| GET    | `/listings/:id/edit` | Show form to edit listing      | Yes (Owner)   |
| PUT    | `/listings/:id`      | Update a specific listing      | Yes (Owner)   |
| DELETE | `/listings/:id`      | Delete a specific listing      | Yes (Owner)   |

### Review Routes
| Method | Route                              | Description                | Auth Required |
|--------|------------------------------------|----------------------------|---------------|
| POST   | `/listings/:id/reviews`            | Create a new review        | Yes           |
| DELETE | `/listings/:id/reviews/:reviewId`  | Delete a review            | Yes (Author)  |

### User Routes
| Method | Route      | Description           | Auth Required |
|--------|------------|-----------------------|---------------|
| GET    | `/signup`  | Show signup form      | No            |
| POST   | `/signup`  | Create new user       | No            |
| GET    | `/login`   | Show login form       | No            |
| POST   | `/login`   | Authenticate user     | No            |
| GET    | `/logout`  | Logout user           | Yes           |

## 📊 Database Schema

### Listing Model
```javascript
{
  title: String (required),
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number (required),
  location: String,
  country: String,
  reviews: [ObjectId] (ref: Review),
  owner: ObjectId (ref: User),
  geometry: {
    type: "Point",
    coordinates: [Number, Number] // [longitude, latitude]
  }
}
```

### Review Model
```javascript
{
  comment: String,
  rating: Number (1-5),
  createdAt: Date,
  author: ObjectId (ref: User)
}
```

### User Model
```javascript
{
  email: String (required),
  username: String (via passport-local-mongoose),
  hash: String (via passport-local-mongoose),
  salt: String (via passport-local-mongoose)
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/BanglaBatash-BNB.git
cd BanglaBatash-BNB
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_access_token
```

4. (Optional) Seed the database with sample data
```bash
node init/index.js
```

5. Start the server
```bash
node app.js
```

6. Open your browser and visit
```
http://localhost:9090
```

## 🎯 Usage

### Creating an Account
1. Click "Sign Up" in the navigation bar
2. Enter your email, username, and password
3. Submit the form to create your account

### Creating a New Listing
1. Log in to your account
2. Click "Add New Listing" in the navbar
3. Fill in the form with:
   - Title
   - Description
   - Upload an image
   - Price per night
   - Location
   - Country
4. Click "Add" to create the listing

### Leaving a Review
1. Navigate to any listing detail page
2. Scroll down to the "Leave a Review" section (login required)
3. Select a star rating (1-5 stars)
4. Write your comment
5. Submit the review

### Using Filters
1. On the main listings page, use category filters at the top
2. Toggle "Display total with taxes" to show/hide tax information
3. Use the search bar to find specific destinations

### Managing Your Listings
- **Edit**: Click "Edit" on your listing detail page
- **Delete**: Click "Delete" on your listing detail page
- Only owners can edit or delete their listings

## 🔒 Security Features

- Password hashing with passport-local-mongoose
- Session-based authentication
- CSRF protection considerations
- Input validation with Joi
- Authorization checks for protected routes
- HTTP-only cookies for session management

## 🐛 Known Issues & Troubleshooting

### MongoDB Atlas SSL Error
If you encounter SSL connection errors with MongoDB Atlas:
- Ensure your IP address is whitelisted in MongoDB Atlas Network Access
- Verify your connection string is correct
- Check if your Node.js version is compatible (recommended: v18 LTS)

## 🔜 Future Enhancements

- [ ] Booking system with calendar
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced search with filters (price range, amenities)
- [ ] User profile pages
- [ ] Favorite/Wishlist feature
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] Analytics and insights
- [ ] Social media authentication (Google, Facebook)
- [ ] Chat feature between hosts and guests

## 👨‍💻 Author

**Mohammad Sazidur Rahman**


