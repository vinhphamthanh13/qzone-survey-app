import axios from 'axios';
import { Storage } from 'react-jhipster';
import { sessionService } from 'redux-react-session';
import makeHeaders from '../helper/makeHeaders';
import { REG_SERVICE_URL, surveyLocalData, eUserType } from '../../constants';

export const REGISTER_USER = 'register_user';
export const VERIFY_USER = 'verify_user';
export const LOGIN_USER = 'login_user';
export const CHECK_AUTH = 'check_auth';
export const RESET_PASSWORD = 'reset_password';
export const CHANGE_PASSWORD = 'change_password';
export const VERIFY_RESEND_USER = 'verify_resend_user';
export const FETCH_USERTYPE_LIST = 'fetch_usertype_list';
export const FETCH_USER_BY_USERID = 'fetch_user_by_userid';
export const TOGGLE_LOADING = 'auth_toggle_loading';
export const FORCE_RESET_PASSWORD = 'force_reset_password';
export const FETCH_MULTIPLE_USER_TYPE = 'fetch_multiple_user_type';

const handleSuccessResponse = callback => (response) => { callback(response); };

const handleErrorResponse = callback => (error) => { callback(error.response); };

export function registerUser(values, callback) {
  axios.post(`${REG_SERVICE_URL}/register`, values)
    .then(handleSuccessResponse(callback))
    .catch(handleErrorResponse(callback));

  return { type: REGISTER_USER };
}

export function verifyUser(values, callback) {
  axios.post(`${REG_SERVICE_URL}/verify`, values)
    .then(handleSuccessResponse(callback))
    .catch(handleErrorResponse(callback));

  return { type: VERIFY_USER };
}

export function verifyResendUser(values, callback) {
  axios.post(`${REG_SERVICE_URL}/resendEmailConfirm`, values)
    .then(handleSuccessResponse(callback))
    .catch(handleErrorResponse(callback));

  return { type: VERIFY_RESEND_USER };
}

export function loginUser(values, callback) {
  axios.post(`${REG_SERVICE_URL}/login`, values)
    .then((response) => {
      const { jwtToken, userId, userType } = response.data;
      Storage.local.set(surveyLocalData.USER_TYPE, userType);
      sessionService.saveSession({ token: jwtToken })
        .then(() => {
          sessionService.saveUser({ userId })
            .then(() => { callback(response); });
        });
    })
    .catch(handleErrorResponse(callback));

  return { type: LOGIN_USER };
}

export function checkAuth(callback) {
  sessionService.loadSession()
    .then(handleSuccessResponse(callback))
    .catch(() => { callback(false); });

  return { type: CHECK_AUTH };
}

export function resetPassword(value, callback) {
  axios.post(`${REG_SERVICE_URL}/resetPassword`, value)
    .then(handleSuccessResponse(callback))
    .catch(handleErrorResponse(callback));

  return { type: RESET_PASSWORD };
}

export function changePassword(value, callback) {
  axios.post(`${REG_SERVICE_URL}/changePassword`, value)
    .then(handleSuccessResponse(callback))
    .catch(handleErrorResponse(callback));

  return { type: CHANGE_PASSWORD };
}

export const fetchUserTypeListActionCreator = payload => ({
  type: FETCH_USERTYPE_LIST,
  payload,
});

export async function fetchUserTypeList(value) {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.post(`${REG_SERVICE_URL}/getListUsersByUserType`, value, axiosConfig);
  return fetchUserTypeListActionCreator(request);
}

export async function fetchUserByUserId(id) {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${REG_SERVICE_URL}/getUserByUserId/${id}`, axiosConfig);
  return {
    type: FETCH_USER_BY_USERID,
    payload: request,
  };
}

export function toggleLoading() {
  return { type: TOGGLE_LOADING };
}

export function forceResetPasswordStatus(value) {
  return { type: FORCE_RESET_PASSWORD, payload: value };
}

export async function completeNewPasswordChallenge(values, callback) {
  const axiosConfig = { headers: await makeHeaders() };
  axios.post(`${REG_SERVICE_URL}/completeNewPasswordChallenge`, values, axiosConfig)
    .then(handleSuccessResponse(callback))
    .catch(handleErrorResponse(callback));

  return { type: eUserType.temporary };
}
