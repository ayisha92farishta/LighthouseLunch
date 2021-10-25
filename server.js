// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//  The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  console.log(name, email, password, phone);

  const queryString = `
    INSERT INTO users (name, email, password, phone)
    VALUES (name, email, password, phone);
  `;

  const queryParams = [];

  db.query(queryString, queryParams)
  .then((result) => {
    let templateVars = {name, email, password, phone: result.rows};
    res.render("registration", templateVars);
  });

  res.redirect("/menu");

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
  SELECT id, name, price, description, thumbnail_photo_url
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

app.post("/cart", (req, res) => {

  const queryString = `
    SELECT users.phone, orders.id
    FROM users
    JOIN orders ON user_id = users.id
    WHERE orders.id = $1
  `;

  const queryParams = [orders.id];

  console.log(`+1${users.phone}`)

  return db.query(queryString, queryParams)
    .then(
      client.messages
        .create({
          body: `Your order number is ${orders.id}. Thank you for choosing Lighthouse Lunch!!`,
          from: '+16042271715',
          to: `+1${users.phone}`
        })
        .create({
          body: `You have a new order! Order Number: ${orders.id}.`,
          from: '+16042271715',
          to: '+16472343536'
        })
        .then(message => console.log(message.sid))
    )
    .then(res => res.rows[0]);

});



//logout route
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.post("/menu", (req, res) => {


});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
