// const data = require('./data/data3.json');
const { database } = require('./config/Firebase');
const { getStores } = require('./mapsApi/MapsApi');

const requestData = {
  query: '忠孝東路',
  type: 'cafe'
};

const saveStores = stores => {
  for (const store of stores) {
    database
      .ref('stores')
      .push(store)
      .catch(err => {
        console.log(err);
      });
  }
};

getStores(requestData)
  .then(({ pagetoken, stores }) => {
    saveStores(stores);
  })
  .catch(err => console.log(err));
