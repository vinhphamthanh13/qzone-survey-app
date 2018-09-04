import axios from 'axios';

export const REGISTER_USER = 'register_user';

const ROOT_URL = `http://45.117.170.211:8091/api/register`

export function registerUser(values,callback) {
  axios.post(ROOT_URL,values)
    .then(
      response => {
        console.log(response)
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

