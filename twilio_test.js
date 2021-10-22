const dbParams = require('./lib/db');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     body: `You have a new order! Order Number: .`,
//     from: '+16042271715',
//     to: '+16472343536'
//   })

const sendMessage = function() {

  const queryString = `
    SELECT users.id, users.phone, orders.id
    FROM users
    JOIN orders ON user_id = users.id
    WHERE orders.id = $1
    AND users.id = $2
  `;

  const queryParams = [users.id, users.phone, orders.id];

  return db.query(queryString, queryParams)
    .then(
      client.messages
        .create({
          body: `Your order number is ${orders.id}. Thank you for choosing Lighthouse Lunch!!`,
          from: '+16042271715',
          to: `+${users.phone}`
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



