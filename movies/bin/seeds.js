// bin/seeds.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies');

const Celebrity = require('../models/celebrity');

const celebrities = [
  {
    name: 'Madonna',
    occupation: 'singer',
    catchPhrase: 'Hello, I am Madonna'
  },
  {
    name: 'Justin Bieber',
    occupation: 'singer',
    catchPhrase: 'Hello, I am Justin Bieber'
  },
  {
    name: 'Eminem',
    occupation: 'singer',
    catchPhrase: 'Hello, I am Eminem'
  }
];

Celebrity.create(celebrities, (err, savedCelebrities) => {
  if (err) { throw err; }

  savedCelebrities.forEach(theCelebrity => {
    console.log(`${theCelebrity.name} - ${theCelebrity._id}`);
  });
  mongoose.disconnect();
});
