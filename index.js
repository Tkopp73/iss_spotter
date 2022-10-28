const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');



const nextISSTimesForMyLocation = (callback) => {
  
  fetchMyIP((err, ip) => {
    if (err) {
      console.log("It didn't work!", err);
      return;
    }
  
    fetchCoordsByIP(ip.ip, (err, coordinates) => {
      if (err) {
        console.log("It didn't work!", err);
      return;
    }

      fetchISSFlyOverTimes(coordinates, (err, passTimes) => {
        if (err) {
          return console.log("It didn't work!", err);
        }
        
        callback(err, passTimes);
      })
      
    });
    
  });
  
};

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((err, issPassTime) => {
  if (err) {
    return err;
  }
  printPassTimes(issPassTime);
})
