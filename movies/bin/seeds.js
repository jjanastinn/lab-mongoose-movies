const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose-movies-development');

const Celebrity = require('../models/celebrity');

const celebrities = [
  {
    name: 'Tom Cruise',
    occupation: 'Scientology Ambassador',
    catchPhrase: 'Show me the money!'
  },
  {
    name: 'Samuel L. Jackson',
    occupation: 'Hitman',
    catchPhrase: 'English! Do you speak it?'
  },
  {
    name: 'Kim Kardashian',
    occupation: 'Unknown',
    catchPhrase: 'Chique scowl'
  },
  {
    name: 'Beyonce',
    occupation: 'Musical Scientist',
    catchPhrase: "If you liked it, then you should've put a ring on it."
  }
];

Celebrity.create(celebrities, (err, savedCelebrities) => {
  if (err) { throw err; }

  savedCelebrities.forEach(theCelebrity => {
    console.log(`${theCelebrity.name} - ${theCelebrity._id}`);
  });
  mongoose.disconnect();
});
