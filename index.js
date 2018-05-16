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
if (argv['t']) {
  requestData.type = argv['t'];
}
const pagetoken = '';
const storesRef = database.ref('stores');
const geoFire = new GeoFire(database.ref('geoFire'));
const saveStores = stores => {
  for (const store of stores) {
    storesRef
      .child(store.id)
      .set(store)
      .catch(err => {
        console.log(err);
      });
    geoFire
      .set(store.id, [store.geometry.location.lat, store.geometry.location.lng])
      .catch(err => {
        console.log(err);
      });
  }
};

const processStores = async (requestData, pagetoken = '') => {
  const result = await getStores(requestData);

  saveStores(result.stores);
  return result.pagetoken;
};

// 0~19
processStores(requestData).then(pagetoken => {
  if (pagetoken) {
    // 20~39
    processStores({ ...requestData, pagetoken }).then(pagetoken => {
      if (pagetoken) {
        // 40~59
        processStores({ ...requestData, pagetoken });
      }
    });
  }
});
