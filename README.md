# Database and Data Processing Lectures

This project contains three lectures demonstrating different aspects of data processing and database operations:

1. JSON Parsing with Node.js
2. MongoDB CRUD Operations
3. Firebase Firestore CRUD Operations

## Prerequisites

- Node.js (v16.20.1 or higher)
- MongoDB Atlas account or local MongoDB installation (for lecture 2)
- Firebase account and project (for lecture 3)
- npm (Node Package Manager)

## Project Setup

1. Clone or download this project to your local machine
2. Install the required dependencies:

```bash
npm install
```

3. Set up environment variables in a `.env` file:

For MongoDB (lecture 2):

```plaintext
MONGODB_URI=your_mongodb_connection_string
```

For Firebase (lecture 3):

```plaintext
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

## Project Structure

```plaintext
├── lecture_1_json_parsing/
│   ├── j.json         # Example JSON data
│   └── main.js        # JSON parsing examples
├── lecture_2_mongodb/
│   ├── config.js      # MongoDB connection configuration
│   ├── main.js        # Main demo script with CRUD operations
│   ├── together.js    # Example script querying theaters collection
│   └── crud.js        # CRUD operations implementation
├── lecture_3_firebase/
│   ├── config.js      # Firebase configuration
│   └── crud.js        # Firebase Firestore CRUD operations
├── package.json
├── package-lock.json
└── .env
```

## Lecture Contents

### Lecture 1: JSON Parsing

Demonstrates how to work with JSON data in Node.js:

- Reading JSON files
- Parsing JSON strings
- Working with JSON objects
- Error handling

Run the example:

```bash
node lecture_1_json_parsing/main.js
```

### Lecture 2: MongoDB CRUD Operations

Demonstrates MongoDB operations using Node.js:

- Connecting to MongoDB
- Creating documents
- Reading documents
- Updating documents
- Deleting documents
- Querying with filters

Run the examples:

```bash
# Main CRUD demonstration
node lecture_2_mongodb/main.js

# Theater location query example
node lecture_2_mongodb/together.js
```

### Lecture 3: Firebase Firestore CRUD Operations

Demonstrates Firebase Firestore operations:

- Connecting to Firebase
- Creating documents
- Reading documents
- Updating documents
- Deleting documents
- Querying with filters
- Working with collections

Run the example:

```bash
node lecture_3_firebase/crud.js
```

## Database Structures

### MongoDB (Lecture 2)

Uses the `sample_mflix` database with collections:

- `movies`: Contains movie information
- `theaters`: Contains theater location information

### Firebase (Lecture 3)

Uses Firestore collections:

- `students`: Contains student information
  - Fields: name, age, grade, courses, createdAt

## Troubleshooting

1. Connection Issues:
   - MongoDB: Check connection string and IP whitelist
   - Firebase: Verify project configuration and credentials
2. Module Errors:
   - Ensure all dependencies are installed (`npm install`)
   - Check that `"type": "module"` is set in package.json

## Additional Resources

- [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/current/)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)

## License

This project is licensed under the MIT License - see the package.json file for details.
