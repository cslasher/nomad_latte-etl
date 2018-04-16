require('dotenv').config();
const axios = require('axios');

const getStores = ({ query, type, pagetoken = '' }) => {
  return axios
    .get(process.env.MAP_HOST, {
      params: {
        key: process.env.MAP_API_KEY,
        query,
        type,
        language: 'zh-TW',
        pagetoken
      }
    })
    .then(res => {
      return {
        pagetoken: res.data.next_page_token,
        stores: res.data.results
      };
    })
    .catch(err => console.log(err));
};

module.exports = { getStores };
