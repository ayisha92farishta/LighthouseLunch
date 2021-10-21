const express = require("express");

const app = express();
const PORT = 8080; // default port 8080


// reference to ejs files inside the views folder
app.set('view engine', 'ejs');
