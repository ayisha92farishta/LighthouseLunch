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

// ********** GET ROUTES **********
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/registration", (req, res) => {
  res.render("registration")
});

app.get("/login", (req, res) => {
  res.render("login")
});

app.get("/login/:id", (req, res) => {

  const { id } = req.params;

  req.session.user_id = id;

  res.redirect('/menu')

});

app.get("/menu", (req, res) => {

  const queryStringMenuItem = `
  SELECT id, name, price, description, thumbnail_photo_url
  FROM menu_items;
  `;

  const queryStringUser = `
    SELECT *
    FROM users
    WHERE users.id = $1;
  `;

  const queryParamsMenuItem = [];

  const queryParamsUser = [`${req.session.user_id}`];

  Promise.all([
    db.query(queryStringMenuItem, queryParamsMenuItem),
    db.query(queryStringUser, queryParamsUser)
  ])
    .then((results)=>{

      console.log(results[0].rows)

      let templateVars = {menuItems: results[0].rows, user: results[1].rows[0]};

      res.render("menu", templateVars);

    });


});

app.get("/cart", (req, res) => {
  res.render("cart")
});

// ********** POST ROUTES **********

app.post("/registration", (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  const queryString = `
    INSERT INTO users (name, email, password, phone)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const queryParams = [name, email, password, phone];

  db.query(queryString, queryParams)
    .then((result) => {
      res.redirect("/registration");
    })
    .catch(error => {
      console.log(error.message)
    });

});

app.post("/login", (req, res) => {
  res.redirect("/");
});

app.post("/cart", (req, res) => {

  const queryString = `
    SELECT users.phone, orders.id
    FROM users
    JOIN orders ON user_id = users.id
    WHERE users.id = 1
  `;

  const queryParams = [];

  db.query(queryString, queryParams)
  .then((result) => {
    let templateVars = {cartItems: result.rows};
    res.render("cart", templateVars);
    console.log(templateVars);
  })

  client.messages
  .create({
     body: `Your order number is ${orders.id}. Thank you for choosing Lighthouse Lunch!!`,
     from: '+16042271715',
     to: `+1${users.phone}`
   })
  .then(message => console.log(message.sid));

  res.redirect('/cart');

});


app.post("/menu", (req, res) => {


});

// ********** LOGOUT ROUTE **********
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

// ********** LISTEN **********
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
