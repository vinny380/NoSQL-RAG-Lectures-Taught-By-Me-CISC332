// Basic CRUD Operations (Create, Read, Update, Delete)

/**
 * Creates a new movie document in the MongoDB collection
 * @param {Collection} movies - The MongoDB collection for movies
 * @param {Object} movieData - The movie data to insert
 * @returns {Promise<InsertOneResult>} Result of the insert operation
 */
export async function createMovie(movies, movieData) {
  // insertOne() adds a single document to the collection
  const insertResult = await movies.insertOne(movieData);
  console.log("Inserted movie with id:", insertResult.insertedId);
  return insertResult;
}

/**
 * Retrieves a single movie document that matches the query
 * @param {Collection} movies - The MongoDB collection for movies
 * @param {Object} query - The query criteria to find the movie
 * @returns {Promise<Object|null>} The found movie document or null if not found
 */
export async function readMovies(movies, query) {
  // Find a single document by exact match
  const movieFound = await movies.findOne(query);
  return movieFound;
}

/**
 * Updates a single movie document that matches the query
 * @param {Collection} movies - The MongoDB collection for movies
 * @param {Object} query - The query criteria to find the movie to update
 * @param {Object} update - The update operations to perform
 * @returns {Promise<UpdateResult>} Result of the update operation
 */
export async function updateMovie(movies, query, update) {
  // updateOne() modifies a single document that matches the query
  const updateResult = await movies.updateOne(query, update);
  console.log("Updated", updateResult.modifiedCount, "document");
  return updateResult;
}

/**
 * Deletes a single movie document that matches the query
 * @param {Collection} movies - The MongoDB collection for movies
 * @param {Object} query - The query criteria to find the movie to delete
 * @returns {Promise<DeleteResult>} Result of the delete operation
 */
export async function deleteMovie(movies, query) {
  // deleteOne() removes a single document that matches the query
  const deleteResult = await movies.deleteOne(query);
  console.log("Deleted", deleteResult.deletedCount, "document");
  return deleteResult;
}

// Advanced Feature: Aggregation Pipeline
// This demonstrates how to process and analyze data
/**
 * Gets statistics about comedy movies using MongoDB's aggregation pipeline
 * @param {Collection} movies - The MongoDB collection for movies
 * @returns {Promise<void>}
 */
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

/**
 * Retrieves all movies from the collection
 * @param {Collection} movies - The MongoDB collection for movies
 * @returns {Promise<Array>} Array of all movie documents
 * @throws {Error} If there's an error fetching the movies
 */
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