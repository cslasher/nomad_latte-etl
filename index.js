const GeoFire = require('geofire');
const argv = require('minimist')(process.argv.slice(2));
const { database } = require('./config/Firebase');
const { getStores } = require('./mapsApi/MapsApi');

const requestData = {
  query: '忠孝東路',
  type: 'cafe'
};
if (argv['q']) {
  requestData.query = argv['q'];
}
const pagetoken = '';
const geoFire = new GeoFire(database.ref('geoFire'));
const saveStores = stores => {
  for (const store of stores) {
    database
      .ref('stores')
      .child(store.id)
      .set(store)
      .catch(err => {
        console.log(err);
      });
    geoFire.set(store.id, [
      store.geometry.location.lat,
      store.geometry.location.lng
    ]);
  }
};

const processStores = async (requestData, pagetoken = '') => {
  const result = await getStores(requestData);

  saveStores(result.stores);
  return result.pagetoken;
};

// 0~19
processStores(requestData)
  .then(pagetoken => {
    if (pagetoken) {
      // 20~39
      processStores({ ...requestData, pagetoken }).then(pagetoken => {
        if (pagetoken) {
          // 40~59
          processStores({ ...requestData, pagetoken });
        }
      });
    }
  })
  .then(console.log('done'));

// database.ref('stores').once('value', snapshot => {
//   const stores = snapshot.val();
//   for (key in stores) {
//     geoFire.set(key, [
//       stores[key].geometry.location.lat,
//       stores[key].geometry.location.lng
//     ]);
//   }
// });
