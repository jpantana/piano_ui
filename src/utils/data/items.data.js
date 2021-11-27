import axios from 'axios';

const baseUrl = 'http://localhost:7000';

export const getAllItems = () => new Promise((resolve, reject) => {
    axios.get(`${ baseUrl }/items`)
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
});

export const getItemById = async ( id ) => new Promise((resolve, reject) => {
  axios.get(`${ baseUrl }/items/${ id }`)
    .then(res => {
        resolve(res.data);
    })
    .catch(reject);
});