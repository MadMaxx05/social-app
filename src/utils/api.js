import axios from 'axios';
import Cookies from 'js-cookie';

export const Api = () =>
  axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
