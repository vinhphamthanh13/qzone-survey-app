import axios from 'axios';
import { sessionService } from 'redux-react-session';

export const REGISTER_USER = 'register_user';
export const VERIFY_USER = 'verify_user';
export const LOGIN_USER = 'login_user';
export const VERIFY_RESEND_USER = 'verify_resend_user';

const ROOT_URL = `http://45.117.170.211:8091/api/user`

export function registerUser(values,callback) {
  console.log("2222222222")
  console.log(values)
  axios.post(`${ROOT_URL}/register/participants`,values)
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

export function verifyResendUser(values) {
  axios.post(`${ROOT_URL}/resendEmailConfirm`,values)
    
  return {
    type: VERIFY_RESEND_USER
  }
}

export function loginUser(values,callback) {
  axios.post(`${ROOT_URL}/login`,values)
    .then(
      response => {
        const token = response.data.jwtToken
        sessionService.saveSession({ token })
        .then(() => {
          sessionService.saveUser(response.data.email)
          .then((abc) => {
            callback(response);
          });
        });
        // return response.json();
      },
      error => {
        callback(error.response)
        return error.response;
      }
    )


  return {
    type: LOGIN_USER
  }
}

