
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'TEST TEXT',
     from: '+16042271715',
     to: '+16135818947'
   })
  .then(message => console.log(message.sid));


  // const addUser = function(user) {
  //   return pool
  //     .query(`
  //       INSERT INTO users (name, email, password)
  //       VALUES($1, $2, $3)
  //       RETURNING *
  //       `, [user.name, user.email, user.password])
  //     .then(res => res.rows[0]);
  // };
  // exports.addUser = addUser;
