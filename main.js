// note a few items in here with <variable/placeholder name> need to be replaced

var AWS = require('aws-sdk');

// test using temporary credentials to list billing bucket contents
AWS.config.update({region: 'us-east-1'});
// from http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/STS.html
var sts = new AWS.STS();
var params = {
  RoleArn: 'arn:aws:iam::<accountid>:role/ice', /* required */
  RoleSessionName: 'test', /* required */
  DurationSeconds: 900,
};
sts.assumeRole(params, function (err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  }
  else {
    console.log(data);           // successful response
    console.log("\n\n");
    // crappy way of doing this, should use callbacks or promises or something, but quick hax!
    var s3 = new AWS.S3({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken
    });
    // subsequent requests will now use temporary credentials from AWS STS.
    var params = {
      Bucket: '<bucketname>', /* required */
      Delimiter: ',',
      EncodingType: 'url'
    };
    s3.listObjects(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        console.log(data);           // successful response
      }
    });
  }
});
