const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const RecipeSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   instructions: String,
//   image: String,
//   // year: String,
//   year: {
//     type: Number,
//     required: true,
//   },
// });

// const Recipe = mongoose.model("Recipe", RecipeSchema);

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  posterImage: String,
  releaseDate: Date,
});

const Movie = mongoose.model("Movie", movieSchema);
