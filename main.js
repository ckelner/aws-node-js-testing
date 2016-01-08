var AWS = require('aws-sdk');
//AWS.config.loadFromPath('./config.json');
AWS.config.update({region: 'us-east-1'});

var ec2 = new AWS.EC2();
// from http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/STS.html
var sts = new AWS.STS();
var params = {
  RoleArn: 'arn:aws:iam::013328811177:role/ice', /* required */
  RoleSessionName: 'kelner-test', /* required */
  DurationSeconds: 900,
};
sts.assumeRole(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
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

/// old test code -- sloppy
/*ec2.describeVolumes(null, function(err, data) {
  if(err) {
    console.log("error: " + err)
  }
  if(data) {
    var count=0;
    for(var i=0; i<data.Volumes.length; i++) {
      console.log("Volume: ", data.Volumes[i].VolumeId);
      count++;
    }
    console.log("manual count: "+count.toString());
    console.log("data array count: "+data.Volumes.length.toString());
  } else {
    console.log("no data...")
  }
});*/
