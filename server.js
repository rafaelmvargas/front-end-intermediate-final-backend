const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
var cors = require("cors");

if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
}

console.log("process.env.NODE_ENV = ", process.env.NODE_ENV);

const movieModel = require("./api/movie.model");
const movieControllers = require("./api/movie.controllers");

const app = express();

const dataBaseURL = process.env.DATABASE || "mongodb://localhost:27017";
// const dataBaseURL = "mongodb://localhost:27017"; // use the local docker database
// const dataBaseURL = "mongodb+srv://daniel:dd2345@cluster0.bs2la.mongodb.net/movies?retryWrites=true&w=majority"; // use the hosted database

console.log("dataBaseURL::", dataBaseURL);

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));


app.use(cors());


app.use(express.static("public"));
app.use(express.json({ extended: false })); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());

app.options("*", cors()); // include before other routes

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   next();
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/movies", movieControllers.findAll);
app.get("/api/movies/:id", movieControllers.findById);
app.post("/api/movies", movieControllers.add);
app.put("/api/movies/:id", movieControllers.update);
app.delete("/api/movies/:id", movieControllers.delete);
app.get("/api/import", movieControllers.import);
app.get("/api/killall", movieControllers.killall);
app.post("/api/upload", movieControllers.upload);

const PORT = process.env.PORT || 3456;

app.listen(PORT, () =>
  console.log(`Server running at port ${PORT}. Process Env db: ${process.env.DATABASE});
`)
);
