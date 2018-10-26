const accountSid = "AC53aad807e1c0f727648db258b0146099";
const authToken = "fbc44c8484e99216a18c1127b72a5b4a";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "test",
    from: "+15626081666",
    to: "+15624558688"
  })
  .then(message => console.log(message.sid))
  .done();

//random aws image s3 upload stuff below, ignore~~!!!!

// below sets up configuration for AWS S3
// we're using AWS S3 for image uploads in the Work Order
import AWS from "aws-sdk";

const myCredentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:9aced621-b96e-4bf0-bcd1-b82c2d7011d0"
});

const myConfig = new AWS.Config({
  credentials: myCredentials,
  region: "us-east-1"
});

//testing file right now, ignore the below block of code

/* upload(e) {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      myConfig.update({
        accessKeyId: "us-east-1",
        secretAccessKey: "qsNcA9kWa4vXZoif3rAf+eVt9eYC8t1hOdEHvL4T"
      });
  
      var s3 = new AWS.S3({
        params: { Bucket: "workorderpictures" }
      });
  
      console.log(s3);
  
      s3.upload(
        {
          Key: "test123",
          Body: file,
          ACL: "public-read"
        },
        function(err, data) {
          if (err) {
            return alert(
              "There was an error uploading your photo: ",
              err.message
            );
          }
          alert("Successfully uploaded photo.");
          //viewAlbum(albumName);
        }
      );
    } */
