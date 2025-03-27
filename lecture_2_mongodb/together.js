import { client } from "./config.js";

async function main() {
    try {
        await client.connect();
        const db = client.db("sample_mflix");
        const collection = db.collection("theaters");

        const theaters = await collection.find({ "location.address.state": "NY" }).toArray();
        
        theaters.forEach(theater => {
            console.log(theater.location.address.street1);
            console.log(theater.location.address.city);
            console.log(theater.location.address.state);
            console.log(theater.location.address.zipcode);
            console.log("latitude:", theater.location.geo.coordinates[0]);
            console.log("longitude:", theater.location.geo.coordinates[1], "\n");
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

await main();

