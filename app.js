//jshint esversion:6

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37,
  favoriteFruit: fruit
});

person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  score: 4,
  review: "Too sour for me"
});

const banana = new Fruit({
  name: "Banana",
  score: 4,
  review: "Weird texture"
});

Fruit.insertMany([kiwi, orange, banana], function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully saved all the fruits to fruitsDB.")
  }
});

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    console.log(fruits);

    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    })
  }
});

Fruit.updateOne({_id: "62b0491c868b857c20c6666f"}, {name: "Peach"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated the document.");
  }
});

Fruit.deleteOne({name: "Peach"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully deleted the document");
  }
});

Person.deleteMany({name: "John"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully deleted all the documents");
  }
});
