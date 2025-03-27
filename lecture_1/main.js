import fs from 'fs';


// Read the JSON file
const jsonData = fs.readFileSync('./j.json', 'utf-8');

// Convert JSON string to object
const data = JSON.parse(jsonData);

// Access simple fields
console.log("Name:", data.name);
console.log("Email:", data.email);

// Access nested fields
console.log("City:", data.address.city);
console.log("Zip Code:", data.address.zip_code);

// Access array elements
console.log("First Order ID:", data.orders[0].order_id);
console.log("Order Total:", data.orders[0].total);

// Loop through items in the first order
console.log("Order Items:");
data.orders[0].items.forEach(item => {
    console.log(`- ${item.product}: $${item.price}`);
});

// Print all elements in address
console.log("Address details:");
for (const [key, value] of Object.entries(data.address)) {
    console.log(`${key}: ${value}`);
}

// // Convert object back to JSON string
// const jsonStringified = JSON.stringify(data, null, 2);
// console.log("JSON Stringified:\n", jsonStringified);



const uri = "mongodb+srv://vinny:1idslNfISnwNEWXo@cluster0.g2l0law.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
