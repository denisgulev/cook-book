const express = require("express");
const path = require("path");

const app = express();
const publicPath = path.join(__dirname, "..", "public");
// process.env.PORT -> port assigned by heroku
const port = process.env.PORT || 3000;

// something that run for each request
// uses '/public' folder as static directory
app.use(express.static(publicPath));

// for every page request that is not in the '/public' folder
// returns the 'index.html' file
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is UP");
});
