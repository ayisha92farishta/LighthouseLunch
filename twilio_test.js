require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'TEST TEXT',
     from: '+16042271715',
     to: '+16472343536'
   })
  .then(message => console.log(message.sid));
