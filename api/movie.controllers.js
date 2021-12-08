const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

exports.findAll = function (req, res) {
  Movie.find({}, function (err, results) {
    return res.send(results);
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Movie.findOne({ _id: id }, (err, json) => {
    if (err) return console.log(err);
    return res.send(json);
  });
};

exports.add = function (req, res) {
  Movie.create(req.body, function (err, Movie) {
    if (err) return console.log(err);
    return res.send(Movie);
  });
};

exports.update = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, { new: true }, (err, json) => {
    if (err) return console.log(err);
    res.json(json);
    // TODO: Send back JSON response
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  Movie.deleteOne({ _id: id }, () => {
    return res.sendStatus(202);
  });
};

exports.upload = function (req, res) {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let file = req.files.file;
  file.mv(`./public/img/${req.body.filename}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ file: `public/img/${req.body.filename}` });
    console.log(" res.json", res.json);
  });
};

exports.import = function (req, res) {
  Movie.create(
    {
      title: "The Matrix Resurrections",
      description:
        "The Matrix cast reunites for the fourth installment of the epic saga. Neo (Keanu Reeves) and Trinity (Laurence Fishburne) are forced to choose one another to fight a war for the survival of the human race.",
      posterImage: "poster_matrix_resurrections.jpg",
      releaseDate: "2021-12-22",
    },
    {
      title: "Resident Evil: Welcome to Raccoon City",
      url: "https://www.imdb.com/title/tt6920084/",
      description:
        "Set in 1998, this origin story explorers the secrets of the mysterious Spencer Mansion and the ill-fated Raccoon City. The story follows the lives of Spencer and his wife, Evelyn, as they attempt to uncover the truth behind the mysterious disappearance of their beloved son.",
      posterImage: "poster_resident_evil_welcome_to_raccoon_city.jpg",
      releaseDate: "2021-11-24",
    },
    {
      title: "The King's Man",
      url: "https://www.imdb.com/title/tt6856242/",
      starring: ["Ralph Fiennes", "Gemma Arterton", "Rhys Ifans"],
      description:
        "In the early years of the 20th century, the Kingsman agency is formed to stand against a cabal plotting a war to wipe out millions.",
      posterImage: "poster_the_kings_man.jpg",
      releaseDate: "2021-12-22",
    },
    {
      title: "Dune",
      url: "https://www.imdb.com/title/tt1160419/",
      starring: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
      description:
        "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
      posterImage: "poster_dune.jpg",
      releaseDate: "2021-10-22",
    },
    function (err) {
      if (err) return console.log(err);
      return res.sendStatus(201);
    }
  );
};

exports.killall = function (req, res) {
  Movie.deleteMany({}, (err) => {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
