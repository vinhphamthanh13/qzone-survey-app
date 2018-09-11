import axios from 'axios';

export const REGISTER_USER = 'register_user';
export const VERIFY_USER = 'verify_user';


const ROOT_URL = `http://45.117.170.211:8091/api/user`

export function registerUser(values,callback) {
  axios.post(`${ROOT_URL}/register/participants`,values)
    .then(
      response => {
        callback(response);
        // return response.json();
      },
      error => {
        callback(error.response)
        return error.response;
      }
    )
  return {
    type: REGISTER_USER
  }
}

export function verifyUser(values,callback) {
  axios.post(`${ROOT_URL}/verify`,values)
    .then(
      response => {
        callback(response);
        // return response.json();
      },
      error => {
        callback(error.response)
        return error.response;
      }
    )
  return {
    type: VERIFY_USER
  }
}

