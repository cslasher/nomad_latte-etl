// const data = require('./data/data3.json');
const { database } = require('./config/Firebase');
const { getStores } = require('./mapsApi/MapsApi');

const requestData = {
  query: '忠孝東路',
  type: 'cafe'
};

const pagetoken = '';

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
