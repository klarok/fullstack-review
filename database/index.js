const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let db = mongoose.connection;
db.once('open', () => {
	console.log('Mongoose ready to go');
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  full_name: String,
  owner: {
		login: String,
		id: Number,
		avatar_url: String,
		html_url: String,
		repos_url: String
	},
  html_url: String,
  description: String,
  created_at: Date,
  updated_at: Date,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

// let repo1 = new Repo ({
// 	id: 1,
// 	name: 'Fake Repo',
// 	full_name: 'So Fake',
// 	owner: {
// 		login: 'faker',
// 		id: 18,
// 	},
// 	description: 'Doesn\'t actually exist.'
// });

// repo1.save((err, repo1) => {
// 	if (err) throw err;
// 	console.log(repo1);
// });

// Repo.find((err, repos) => {
// 	if (err) throw err;
// 	console.log(repos);
// });

let save = (repoData) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repoData.forEach(data => {
  	let repo = new Repo(data);
  	console.log('here\'s data', typeof data);
  	console.log('here\'s repo', typeof repo);
  	repo.save(err => {
  		if (err) {
  			console.log('Error saving repo to database', err);
  		}
  	});
  });
  //What about insertMany
}

module.exports.save = save;