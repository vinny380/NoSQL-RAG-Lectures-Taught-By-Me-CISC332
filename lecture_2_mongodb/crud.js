// Basic CRUD Operations (Create, Read, Update, Delete)

// CREATE - Insert a new document into MongoDB
// This function takes a collection and data, then adds the data as a new document
export async function createMovie(movies, movieData) {
  // insertOne() adds a single document to the collection
  const insertResult = await movies.insertOne(movieData);
  console.log("Inserted movie with id:", insertResult.insertedId);
  return insertResult;
}

// READ - Retrieve documents from MongoDB
// This function demonstrates different ways to query documents
export async function readMovies(movies, query) {
  // Find a single document by exact match
  const movieFound = await movies.findOne(query);
  return movieFound;
}

// UPDATE - Modify existing documents
// This function updates documents that match a query
export async function updateMovie(movies, query, update) {
  // updateOne() modifies a single document that matches the query
  const updateResult = await movies.updateOne(query, update);
  console.log("Updated", updateResult.modifiedCount, "document");
  return updateResult;
}

// DELETE - Remove documents
// This function removes documents that match a query
export async function deleteMovie(movies, query) {
  // deleteOne() removes a single document that matches the query
  const deleteResult = await movies.deleteOne(query);
  console.log("Deleted", deleteResult.deletedCount, "document");
  return deleteResult;
}

// Advanced Feature: Aggregation Pipeline
// This demonstrates how to process and analyze data
export async function getComedyMovieStats(movies) {
  // Pipeline is an array of stages that process documents
  const pipeline = [
    // Stage 1: Filter for comedy movies
    { $match: { genres: "Comedy" } },
    // Stage 2: Group by year and count movies
    { $group: { _id: "$year", count: { $sum: 1 } } },
    // Stage 3: Sort by year in descending order
    { $sort: { _id: -1 } },
    // Stage 4: Limit to top 5 results
    { $limit: 5 }
  ];
  const aggCursor = movies.aggregate(pipeline);
  console.log("Number of comedy movies per year (top 5 recent years):");
  for await (const doc of aggCursor) {
    console.log(`Year ${doc._id}: ${doc.count} movies`);
  }
}

// GET ALL - Retrieve all movies from the collection
export async function getAllMovies(movies) {
  try {
    // Find all documents in the collection
    const cursor = movies.find({});
    const allMovies = [];
    
    // Loop through the cursor and collect all movies
    for await (const movie of cursor) {
      allMovies.push(movie);
    }
    
    console.log(`Found ${allMovies.length} movies in total`);
    return allMovies;
  } catch (error) {
    console.error("Error fetching all movies:", error);
    throw error;
  }
}