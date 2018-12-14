const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, callback);

  // const req = request.Request(`https://api.github.com/users/${username}`);

  // return fetch(`https://api.github.com/users/${username}`,
  //   options)
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     // console.log('Error fetching from GitHub', err);
  //     return err;
  //   });

}

module.exports.getReposByUsername = getReposByUsername;