import axios from 'axios';

const clientHttps = (url) => {
  return axios.create({
    baseURL: url || process.env.APIHOST,
    timeout: 1000,
  });
}

export default clientHttps;