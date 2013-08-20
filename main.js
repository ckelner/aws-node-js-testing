var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
AWS.config.update({region: 'us-east-1'});

var ec2 = new AWS.EC2();

ec2.describeVolumes(null, function(err, data) {
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
});
