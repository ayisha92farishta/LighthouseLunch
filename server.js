// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const { addUser } = require("./database");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

//App home page
app.get("/", (req, res) => {
  res.render("index");
});

//registration get route
app.get("/registration", (req, res) => {
  res.render("registration")
});

//registration post route
app.post("/registration", (req, res) => {
  res.redirect("/");
});

//login get route
app.get("/login", (req, res) => {
  res.render("login")
});

//login post route
app.post("/login", (req, res) => {
  res.redirect("/");
});

//route for menu page
app.get("/menu", (req, res) => {

  const queryString = `
  SELECT name, price, description, thumbnail_photo_url
  FROM menu_items;
  `;

  const queryParams = [];

  db.query(queryString,queryParams)
  .then((result)=>{
    let templateVars = {menuItems: result.rows};
    res.render("menu", templateVars);
  });

});

//route for cart page
app.get("/cart", (req, res) => {
  res.render("cart")
});

//logout route
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
