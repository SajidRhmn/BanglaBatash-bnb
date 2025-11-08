# BanglaBatash BNB 🏡
[!!!Currently under development!!!]
A full-stack Airbnb-inspired vacation rental platform built with Node.js, Express, MongoDB, and EJS. BanglaBatash BNB allows users to browse, create, edit, and manage property listings for short-term vacation rentals.

## 🌟 Features

- **Browse Listings**: View all available vacation rental properties
- **Detailed Property View**: See comprehensive details for each listing including description, price, location, and images
- **Create Listings**: Add new properties to the platform
- **Edit Listings**: Update existing property information
- **Delete Listings**: Remove properties from the platform
- **RESTful API**: Full CRUD operations following REST conventions
- **Responsive Design**: Clean and intuitive user interface

## 🛠️ Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data persistence
- **Mongoose**: MongoDB object modeling tool

### Frontend
- **EJS**: Embedded JavaScript templating engine
- **HTML5 & CSS3**: Structure and styling
- **Method-Override**: Support for PUT and DELETE HTTP methods in forms




## 📁 Project Structure [So far]

```
BanglaBatash-BNB/
├── init/
│   ├── data.js          # Sample listing data
│   └── index.js         # Database seeding script
├── models/
│   └── listing.js       # Mongoose schema for listings
├── views/
│   ├── listing.ejs      # Display all listings (Index)
│   ├── show.ejs         # Display single listing (Detail)
│   ├── new.ejs          # Form to create new listing
│   └── edit.ejs         # Form to edit existing listing
├── app.js               # Main application file
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## 🔌 API Routes

| Method | Route                | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/listings`          | Get all listings               |
| GET    | `/listings/new`      | Show form to create new listing|
| POST   | `/listings`          | Create a new listing           |
| GET    | `/listings/:id`      | Show specific listing details  |
| GET    | `/listings/:id/edit` | Show form to edit a listing    |
| PUT    | `/listings/:id`      | Update a specific listing      |
| DELETE | `/listing/:id`       | Delete a specific listing      |

## 📊 Database Schema

### Listing Model

```javascript
{
  title: String (required),
  description: String,
  image: String (with default),
  price: Number,
  location: String,
  country: String
}
```


## 🎯 Usage

### Creating a New Listing
1. Navigate to `/listings/new`
2. Fill in the form with:
   - Title
   - Description
   - Image URL
   - Price
   - Country
   - Location
3. Click "Add" to create the listing

### Editing a Listing
1. View any listing detail page
2. Click "Edit"
3. Update the desired fields
4. Submit the form to save changes

### Deleting a Listing
1. View any listing detail page
2. Click "Delete"
3. The listing will be removed from the database

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] Image upload functionality
- [ ] Search and filter listings
- [ ] Booking system
- [ ] Reviews and ratings
- [ ] Google Maps integration
- [ ] Payment integration
- [ ] User profiles
- [ ] Favorite/Wishlist feature
- [ ] Advanced styling with Bootstrap/Tailwind CSS


## 👨‍💻 Author

Mohammad Sazidur Rahman

## 🙏 Acknowledgments

- Inspired by Airbnb
- Sample images from [Unsplash](https://unsplash.com)
- Built as part of full-stack web development learning

---

**Note**: This is a learning project 
