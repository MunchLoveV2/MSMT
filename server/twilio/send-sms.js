const accountSid = 'AC53aad807e1c0f727648db258b0146099'; 
const authToken = 'fbc44c8484e99216a18c1127b72a5b4a'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: "test", 
         from: '+15626081666',       
         to: '+15624558688' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();