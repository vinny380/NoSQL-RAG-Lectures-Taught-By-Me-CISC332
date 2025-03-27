// Import required MongoDB modules
import { MongoClient } from 'mongodb';
import 'dotenv/config';

// MongoDB connection string (URI) that specifies the database location and credentials
const uri = process.env.MONGODB_URI;

// Create a MongoDB client, which sets up how we'll interact with MongoDB
export const client = new MongoClient(uri);