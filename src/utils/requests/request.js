import { getQueryParam } from '../../helpers/getQueryParam';
import { getSessionStorage } from '../../helpers/sessionStorage';
export const BASE_URL = 'https://jobs-api.squareboat.info/api/v1/';

const myHeaders = () => {
  let myHeader = new Headers();
  myHeader.append('Content-Type', 'application/json');
  if (getSessionStorage('token')) {
    myHeader.append('Authorization', getSessionStorage('token'));
  }
  return myHeader;
};

export const getRequest = (url, params = {}) => {
  return fetch(`${BASE_URL}${url}?${getQueryParam(params)}`, {
    method: 'GET',
    headers: myHeaders(),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error =
          (data && data.message) ||
          (data && data.errors) ||
          response.statusText;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      console.error('ERROR :  ', error);
      return error.toString();
    });
};

export const postRequest = (url, reqBody = {}) => {
  return fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: myHeaders(),
    body: JSON.stringify(reqBody),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error =
          (data && data.message) ||
          (data && data.errors) ||
          response.statusText;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      console.error('ERROR : ', error);
      return error;
    });
};
