require('dotenv').config();
const mongoose = require('mongoose');

// --- Schema & Model ---
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// --- Connect to DB ---
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// --- Challenge Functions ---
const createAndSavePerson = (done) => {
  const john = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "pasta"]
  });

  john.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// let Person;

const arrayOfPeople = [
  { name: "Alice", age: 25, favoriteFoods: ["salad", "sushi"] },
  { name: "Bob", age: 40, favoriteFoods: ["burgers", "steak"] },
  { name: "Charlie", age: 35, favoriteFoods: ["pasta", "pizza"] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};


const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    return done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    return done(null, person);
  });
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // 1. Find the person by ID
  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    // 2. Add "hamburger" to the favoriteFoods array
    person.favoriteFoods.push(foodToAdd);

    // 3. Save the updated document
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    });
  });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // find by name and update the age
  Person.findOneAndUpdate(
    { name: personName },          // search filter
    { age: ageToSet },             // update
    { new: true },                 // return updated document
    (err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    return done(null, removedPerson);
  });
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    return done(null, result);
  });
};


const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })        // sort by name (ascending)
    .limit(2)                 // limit results to 2 docs
    .select("-age")           // hide the age field
    .exec((err, data) => {    // execute the query
      if (err) return done(err);
      return done(null, data);
    });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
