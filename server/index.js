const express = require('express');
let app = express();
const bodyParser = require('body-parser');
let {retrieve, save} = require('../database');
let {getReposByUsername} = require('../helpers/github');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  let username = req.body.username;
  console.log(username);
  getReposByUsername(username, (err, response, docs) => {
  	if (err) {
  		console.log('Error getting repos by username', err);
  	}
 	let parsedDocs = JSON.parse(docs);
  	save(parsedDocs);
  	res.send(parsedDocs); //Redirect to force page refresh?
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  retrieve()
  	.then(docs => {
  		res.send(docs);
  	})
  	.catch(err => {
  		console.log('Error retrieving documents', err);
  		res.send('oops');
  	});
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

