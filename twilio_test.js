const dbParams = require('./lib/db');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// const sendMessage = function() {

//   const queryString = `
//     SELECT users.phone, orders.id
//     FROM users
//     JOIN orders ON user_id = users.id
//     WHERE orders.id = $1
//   `;

//   const queryParams = [orders.id];
//   console.log(`+1${users.phone}`)
//   return db.query(queryString, queryParams)
//     .then(
//       client.messages
//         .create({
//           body: `Your order number is ${orders.id}. Thank you for choosing Lighthouse Lunch!!`,
//           from: '+16042271715',
//           to: `+1${users.phone}`
//         })
//         .create({
//           body: `You have a new order! Order Number: ${orders.id}.`,
//           from: '+16042271715',
//           to: '+16472343536'
//         })
//         .then(message => console.log(message.sid))
//     )
//     .then(res => res.rows[0]);

// };

// exports.sendMessage = sendMessage;




// Note: Since we're using the `await` keyword in this Function, it must be declared as `async`
exports.handler = async function (context, event, callback) {
  // The pre-initialized Twilio Client is available from the `context` object
  const twilioClient = context.getTwilioClient();

  // In this example the messages are inlined. They could also be retrieved from
  // a private Asset, an API call, a call to a database, etc to name some options.
  const groupMessages = [
    {
      name: 'Person1',
      to: '+16472343536',
      body: 'Hello Brian',
      from: '+16042271715',
    },
    {
      name: 'Person2',
      to: '+16042120111',
      body: 'Hello Meridy',
      from: '+16042271715',
    }
  ];

  try {
    // Create an array of message promises with `.map`, and await them all in
    // parallel using `Promise.all`. Be sure to use the `await` keyword to wait
    // for the promises to all finish before attempting to log or exit!
    const results = await Promise.all(
      groupMessages.map((message) => twilioClient.messages.create(message))
    );
    results.forEach((result) => console.log(`Success: ${result.sid}`));
    // Make sure to only call `callback` once everything is finished, and to pass
    // null as the first parameter to signal successful execution.
    return callback(null, 'Batch SMS Successful');
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
