var AWS = require('aws-sdk');

// test using temporary credentials to list billing bucket contents
AWS.config.update({region: 'us-east-1'});
var s3 = new AWS.S3();
// from http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/STS.html
var sts = new AWS.STS();
var params = {
  RoleArn: 'arn:aws:iam::013328811177:role/ice', /* required */
  RoleSessionName: 'kelner-test', /* required */
  DurationSeconds: 900,
};
sts.assumeRole(params, function (err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  }
  else {
    console.log(data);           // successful response
    // crappy way of doing this, should use callbacks or promises or something, but quick hax!
    // from http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/TemporaryCredentials.html
    // Note that environment credentials are loaded by default,
    // the following line is shown for clarity:
    AWS.config.credentials = new AWS.EnvironmentCredentials('AWS');
    // Now set temporary credentials seeded from the master credentials
    AWS.config.credentials = new AWS.TemporaryCredentials();
    // subsequent requests will now use temporary credentials from AWS STS.
    var params = {
      Bucket: 'twc_consolidated_billing', /* required */
      Delimiter: ',',
      EncodingType: 'url'
    };
    s3.listObjects(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
});
