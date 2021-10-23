const dbParams = require('./lib/db');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// ********** Add new user into database **********
const addUser = function(obj) {
  return db.query(`
  INSERT INTO users (name, email, password, phone)
  VALUES($1, $2, $3, $4)
  RETURNING *
  `, [users.name, users.email, users.password, users.phone])
    .then(res => res.rows[0]);
};

exports.addUser = addUser;


// ********** Send SMS to client & host after checkout **********
const sendMessage = function() {

  const queryString = `
    SELECT users.phone, orders.id
    FROM users
    JOIN orders ON user_id = users.id
    WHERE orders.id = $1
  `;

  const queryParams = [orders.id];

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

};

exports.sendMessage = sendMessage;