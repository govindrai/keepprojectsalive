const axios = require('axios');

const projectUrls = [
  'https://lpnfitness.herokuapp.com/',
  'https://peoplegroveapp.herokuapp.com/',
  'https://redisusers.herokuapp.com',
  'https://simpletube.herokuapp.com/',
  'https://counted.herokuapp.com',
  'https://clutterapp.herokuapp.com/',
];

async function handler(event, context, callback) {
  try {
    const pings = projectUrls.map(async url => {
      const res = await axios.get(url);
      if (res.status > 300) {
        throw new Error(res.data);
      }
    });
    await Promise.all(pings);
    console.log('Success');
    callback(null);
  } catch (e) {
    console.log('ERROR PINGING APPS');
    console.log(e);
    callback(e);
    // also should send out a notification or be caught by CloudWatch alarm..
  }
}

module.exports = {
  handler,
};
