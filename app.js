const express = require("express"); //import package
const app = express(); //execute the package
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json()); //to process the data sent by the client

//import routes
const postsRoute = require("./routes/posts");

//middlewares
app.use("/posts", postsRoute);

//routing
app.get("/", (req, res) => {
  // slash is localhost
  res.send("Hello World!"); //response
});

//connect to db
mongoose.connect(
    ""+ process.env.DB_CONNECTION, {connectTimeoutMS: 1000},
    () =>console.log("connected to db")
);

//listen
app.listen(3000);
