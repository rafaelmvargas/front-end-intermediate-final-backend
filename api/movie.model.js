const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  url: String,
  starring: [String],
  description: String,
  image: String,
  posterImage: String,
  releaseDate: Date,
});

const Movie = mongoose.model("Movie", movieSchema);
