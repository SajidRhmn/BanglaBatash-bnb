# BanglaBatash BNB 🏡

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

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- npm (comes with Node.js)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BanglaBatash-BNB.git
   cd BanglaBatash-BNB
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**

   Make sure MongoDB is running on your local machine:
   ```bash
   # On Windows (if installed as a service, it runs automatically)
   # Or start manually:
   mongod
   ```

4. **Seed the database** (Optional - adds sample listings)
   ```bash
   node init/index.js
   ```

5. **Start the application**
   ```bash
   node app.js
   ```

   Or with nodemon for auto-restart during development:
   ```bash
   nodemon app.js
   ```

6. **Access the application**

   Open your browser and navigate to:
   ```
   http://localhost:9090
   ```

## 📁 Project Structure

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

## 🌱 Sample Data

The project includes 30 pre-configured sample listings from various locations worldwide, including:
- Beach cottages
- Mountain retreats
- City lofts
- Historic villas
- Luxury penthouses
- And more!

## 🔧 Configuration

### Database Configuration
The MongoDB connection URL is configured in `app.js`:
```javascript
const MONGO_URL = 'mongodb://127.0.0.1:27017/BanglaBatash_BNB';
```

### Port Configuration
The server runs on port 9090 by default. You can change this in `app.js`:
```javascript
app.listen(9090, () => {
    console.log("App is listening on port 9090")
})
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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspired by Airbnb
- Sample images from [Unsplash](https://unsplash.com)
- Built as part of full-stack web development learning

---

**Note**: This is a learning project and is not intended for production use without additional security and feature implementations.
