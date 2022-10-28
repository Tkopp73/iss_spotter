const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) return callback(err, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request('http://ipwho.is/' + ip, (err, response, body) => {
    if (err) return callback(err, null);

    const data = JSON.parse(body);

    if (!data) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(msg), null);
      return;
    }

    const {latitude, longitude} = data;

    callback(null, {latitude, longitude});
  });
};


const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) return callback(err, null);

    const data = JSON.parse(body);

    if (!data) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(msg), null);
      return;
    }

    let dateArray = data.response;
    
    callback(null, dateArray);

  
  });
};




module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};