import axios from 'axios';
import { sessionService } from 'redux-react-session';

export const REGISTER_USER = 'register_user';
export const VERIFY_USER = 'verify_user';
export const LOGIN_USER = 'login_user';
export const CHECK_AUTH = 'check_auth';
export const RESET_PASSWORD = 'reset_password';
export const CHANGE_PASSWORD = 'change_password';
export const VERIFY_RESEND_USER = 'verify_resend_user';
export const FETCH_USERTYPE_LIST = 'fetch_usertype_list';
export const FETCH_USER_BY_USERID = 'fetch_user_by_userid';

const ROOT_URL = `http://45.117.170.211:8091/api/user`

export function registerUser(values,callback) {
  axios.post(`${ROOT_URL}/register`,values)
    .then(
      response => {
        callback(response);
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

export function verifyResendUser(values, callback) {
  axios.post(`${ROOT_URL}/resendEmailConfirm`,values)
    .then(
      response => {
        callback(response);
      },
      error => {
        callback(error.response)
        return error.response;
      }
    )
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
          sessionService.saveUser(response.data.userId)
          .then((abc) => {
            callback(response);
          });
        });
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

export function checkAuth(values,callback) {
  sessionService.loadSession()
    .then(
      currentSession => {
        callback(currentSession)
      })
    .catch( error => {
        callback(false)
      }
    ) 
  return{
    type: CHECK_AUTH
  }
}

export function resetPassword(value,callback){
  axios.post(`${ROOT_URL}/resetPassword`, value)
    .then(
      response => {
        callback(response);
      },
      error => {
        callback(error.response)
      }
    )
  return{
    type: RESET_PASSWORD
  }
}

export function changePassword(value,callback){
  axios.post(`${ROOT_URL}/changePassword`, value)
    .then(
      response => {
        callback(response);
      },
      error => {
        callback(error.response)
      }
    )
  return{
    type: CHANGE_PASSWORD
  }
}

export function fetchUserTypeList(value,callback){
  const token = value.token
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  const request = axios.post(`${ROOT_URL}/getListUsersByUserType`, value, axiosConfig)
  return{
    type: FETCH_USERTYPE_LIST,
    payload: request
  }
}

export function fetchUserByUserId(id,token,callback){
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  const request = axios.get(`${ROOT_URL}/getUserByUserId/${id}`, axiosConfig)
  return{
    type: FETCH_USER_BY_USERID,
    payload: request
  }
}
