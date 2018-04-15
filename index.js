const data = require('./data/data3.json');
const { database } = require('./config/Firebase');

for (const store of data.results) {
  database
    .ref('stores')
    .push(store)
    .catch(err => {
      console.log(err);
    });
}

console.log(`${data.results.length} added.`);
