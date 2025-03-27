# MongoDB CRUD Operations Demo

This project demonstrates basic MongoDB operations using Node.js, including how to connect to a MongoDB database and perform CRUD (Create, Read, Update, Delete) operations.

## Prerequisites

- Node.js (v16.20.1 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm (Node Package Manager)

## Project Setup

1. Clone or download this project to your local machine
2. Install the required dependencies from the package-lock.json:

```bash
npm install
```

Or manually install the libraries needed:
```bash
npm install mongodb dotenv
```

3. Create a `.env` file in the root directory of the project and add your MongoDB connection string:

```plaintext
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with either:

- Your MongoDB Atlas connection string, or
- Local MongoDB connection string (e.g., `mongodb://localhost:27017/sample_mflix`)

## Project Structure

```plaintext
├──lecture_1/
│   ├── j.json         # Example JSON used in the first lecture
│   ├── main.js          # How to parse a JSON using javascript/nodeJS
├── lecture_2_mongodb/
│   ├── config.js         # MongoDB connection configuration
│   ├── main.js          # Main demo script with CRUD operations
│   ├── together.js      # Example script querying theaters collection
│   └── crud.js          # CRUD operations implementation
├── package.json
├── package-lock.json
└── .env
```

## Available Scripts

The project includes several example scripts:

1. Main CRUD demonstration:

```bash
node lecture_2_mongodb/main.js
```

This script demonstrates:

- Creating a new movie
- Reading movies from the database
- Updating a movie
- Deleting a movie
- Getting statistics about comedy movies

2. Theater location query example:

```bash
node lecture_2_mongodb/together.js
```

This script demonstrates how to:

- Query theaters in New York state
- Access nested document fields
- Work with geolocation data

## Database Structure

The project uses the `sample_mflix` database, which includes collections like:

- `movies`: Contains movie information
- `theaters`: Contains theater location information

## Code Examples

### Connecting to MongoDB

```javascript
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
```

### Basic Query Example

```javascript
const theaters = await collection.find({ 
    "location.address.state": "NY" 
}).toArray();
```

## Troubleshooting

1. If you get a connection error:

   - Check if your MongoDB URI is correctly set in the `.env` file
   - Verify that your IP address is whitelisted in MongoDB Atlas
   - Ensure MongoDB is running if using a local installation
2. If you get a "Module not found" error:

   - Verify that all dependencies are installed (`npm install`)
   - Check that the `"type": "module"` is set in package.json

## Additional Resources

- [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/current/)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [MongoDB CRUD Operations](https://www.mongodb.com/docs/manual/crud/)

## License

This project is licensed under the MIT License - see the package.json file for details.
