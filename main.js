var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: "REPLACEME",
  secretAccessKey: "REPLACEME",
  region: 'us-east-1'
});

var ec2 = new AWS.EC2();

ec2.describeVolumes(null, function(err, data) {
  
  var count=0;
  for(var i=0; i<data.Volumes.length; i++) {
    console.log("Volume: ", data.Volumes[i].VolumeId);
    count++;
  }
  console.log("manual count:"+count.toString());
  console.log("data array count:"+data.Volumes.length.toString());
});