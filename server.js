const express = require("express");
const parser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const app = express();
let database = {};
database.connectionString =
  "mongodb+srv://DepthDweller21:P0YvljIktS2BbbVN@new-crud-app.ebjwiea.mongodb.net/";
const PORT = 5000;

// not sure what this is but I need it to do something related to json, parsing, urls and APIs, will find out soon enough
path.join(__dirname, 'views');//no clue S said so
app.use(parser.urlencoded({ extended: true }));

// renders everything in the public folder

app.use(express.static("public"));
// this line of code uses express to launch the site on localhost PORT as shown in the variable section

app.listen(process.env.PORT ||PORT, function () {
  console.log(
    `server is live Mr.Duck on port: ${PORT}, please visit the project on localhost:${PORT}`
  );
});

//connecting to database
async function runDatabase() {
  console.log(`running database`);
  try {
    const client = await mongoClient.connect(database.connectionString);
    console.log("Connected to Database Mr.Duck");
    database.quotesCollection = client.db("crud-app").collection("quotes");
  } catch (err) {
    console.log(err);
  }
}
runDatabase();
/* all this till now was the application initialisation
this line of code listens on path /quotes which the HTML responds on*/

app.post("/addQuotes", async (req, res) => {
  try {
    await database.quotesCollection.insertOne(req.body);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.get("/getQuotes", async (req, res) => {
  let search = req.query.searchName.toLowerCase();
  let quotesCollection = await database.quotesCollection.find().toArray();

  let searchResult = quotesCollection.filter((element) =>element.name == search ? true : false);

  res.json(searchResult);
});

//P0YvljIktS2BbbVN