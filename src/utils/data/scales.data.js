import axios from 'axios';

const baseUrl = 'http://localhost:7000';

export const getMajorScaleByRoot = ( note ) => new Promise((resolve, reject) => {
    axios.get(`${ baseUrl }/major/${ note }`)
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
});

export const getNaturalMinorScaleByRoot = ( note ) => new Promise((resolve, reject) => {
    axios.get(`${ baseUrl }/minor/${ note }`)
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
});