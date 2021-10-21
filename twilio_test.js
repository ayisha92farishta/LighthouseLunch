require('dotenv').config();

const accountSid = 'AC038b9786e3af281ff575b9b565d881c9';
const authToken = '94711538d7ef90102da5d3a6ac37d470';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'BREATHLESS',
     from: '+16042271715',
     to: '+16472343536'
   })
  .then(message => console.log(message.sid));
