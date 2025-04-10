"use strict";

// Import the Mongoose library
const mongoose = require("mongoose");

// Connect the mongoose instance to our MongoDB
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => {
    console.error(`Error connecting to mongodb: ${e.message}`);
  });

// Define the document model for the 'cats' collection
const Cat = mongoose.model("Cat", { name: String, age: Number });

const main = async () => {
  // Create a new Cat document and save it to the database
  const kitty = new Cat({ name: "Callie", age: 6 });
  const savedKitty = await kitty.save();
  console.log(`${savedKitty.name} says 'meow'`);

  // Directly insert an array of Cat property objects
  const newCats = [
    { name: "Fluffy", age: 2 },
    { name: "Pink Spots", age: 12 },
    { name: "Tabatha", age: 16 },
  ];
  const docs = await Cat.insertMany(newCats);
  console.log(docs);

  // List all of the Cats in the collection
  const catsNamedSpot = await Cat.find({ name: "Spot" });
  console.log({ catsNamedSpot });

  // List only the Cats with 'Spot' in the name
  const catsNamedSpotRegexp = await Cat.find({ name: /Spot/ });
  console.log({ catsNamedSpotRegexp });
};

main();
