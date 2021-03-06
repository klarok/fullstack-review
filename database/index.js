const mongoose = require('mongoose');
let mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/fetcher';
// mongoose.connect('mongodb://localhost/fetcher');
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(mongoURI);

let db = mongoose.connection;
db.once('open', () => {
	console.log('Mongoose ready to go');
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, unique: true},
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

Repo.on('index', err => {
	if (err) {
		console.log('Error generating unique index', err);
	}
});

let retrieve = (options = {}, select = '', sort = '') => {
	let query = Repo.find(options).select(select).limit(25)
		.sort(sort);
	return query.then(docs => {
		return docs;
	})
		.catch(err => {
			console.log('Error querying for documents.', err);

		});
}

let save = (repoData) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  repoData.forEach(data => {
  	let repo = new Repo(data);
  	// repo.save(err => {
  	// 	if (err) {
  	// 		console.log('Error saving repo to database', err);
  	// 	}
  	// });
  	Repo.update({id: data.id}, data, {upsert: true}, err => {
  		if (err) {
  			console.log('Error saving repo to database', err);
  		}
  	});
  });
}

module.exports.retrieve = retrieve;
module.exports.save = save;