import { client } from './config.js';
import { createMovie, readMovies, updateMovie, deleteMovie, getComedyMovieStats, getAllMovies } from './crud.js';

// Step 1: Connect to MongoDB
await client.connect();
console.log("Connected to MongoDB!");


// Step 2: Select the database
const database = client.db("sample_mflix");


// Step 3: Select the collection (like a table in SQL)
const movies = database.collection("movies");


// Main function that runs our MongoDB operations
async function main() {
  try {

    // Step 4: Prepare sample movie data (this is a JavaScript object)
    const newMovie = {
      title: "Jocelyn Is Cool",
      year: 2003,
      runtime: 120,
      genres: ["Romance", "Comedy"]
    };

    // Step 5: Demonstrate CRUD operations in sequence
    console.log("\n--- Creating a new movie ---");
    let newMovieResult = await createMovie(movies, newMovie);
    let newMovieId = newMovieResult.insertedId;

    console.log("\n--- Reading movies ---");
    await readMovies(movies);

    console.log("\n--- Updating a movie ---");
    await updateMovie(
      movies,
      { _id: newMovieId },  // query to find the movie
      { $set: { year: 2023 } }         // update to apply
    );

    console.log("\n--- Deleting a movie ---");
    await deleteMovie(movies, { title: "The MongoDB Story" });
    
    console.log("\n--- Analyzing comedy movies ---");
    await getComedyMovieStats(movies);

    console.log("\n--- Getting all movies ---");
    await getAllMovies(movies);

  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // Always close the connection when done
    await client.close();
    console.log("\nConnection closed.");
  }
}

async function alternativeMain() {
  try {
    console.log("\n--- Reading Movie ---");
    let movieResult = await readMovies(movies, { title: "Jocelyn Is Cool" });
    console.log(movieResult.genres);
  }
  catch (error) {
    console.error("Error occurred:", error);
  }
  finally {
    await client.close();
    console.log("\nConnection closed.");
  }
}

// Start the program
console.log("Starting MongoDB demonstration...");
// main().catch(console.dir);
alternativeMain().catch(console.dir);