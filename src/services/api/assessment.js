import axios from 'axios';
import { SURVEY_URL } from '../../constants';
export const FETCH_SURVEYS = 'fetch_surveys';
export const CREATE_SURVEY = 'create_survey';
export const FETCH_SURVEY = 'fetch_survey';
export const DELETE_SURVEY = 'delete_survey';
export const DELETE_ALL_SURVEY = 'delete_all_survey';
export const EDIT_SURVEY = 'edit_survey';
export const TOGGLE_LOADING = 'survey_toggle_loading';

export function fetchSurveys(token) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  const request = axios.get(`${SURVEY_URL}/surveys`, axiosConfig)
  return {
    type: FETCH_SURVEYS,
    payload: request
  };
}
export function fetchSurveysByAssessorId(userId, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  const request = axios.get(`${SURVEY_URL}/findSurveyByAessessorId/${userId}`, axiosConfig);
  return {
    type: FETCH_SURVEYS,
    payload: request
  };
}
export function fetchSurvey(id, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  const request = axios.get(`${SURVEY_URL}/surveys/${id}`, axiosConfig);
  return {
    type: FETCH_SURVEY,
    payload: request
  };
}

export function deleteSurvey(id, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  axios.delete(`${SURVEY_URL}/surveys/${id}`, axiosConfig)
    .then(() => callback())
  return {
    type: DELETE_SURVEY
  };
}


export function deleteAllSurvey(id, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  axios.delete(`${SURVEY_URL}/surveys`, axiosConfig)
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
    type: DELETE_ALL_SURVEY
  };
}

export function createSurvey(values, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  axios.post(`${SURVEY_URL}/surveys`, values, axiosConfig)
    .then((response) => callback(response));
  return {
    type: CREATE_SURVEY
  }
}

export function editSurvey(values, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  axios.put(`${SURVEY_URL}/surveys`, values, axiosConfig)
    .then(() => callback());
  return {
    type: EDIT_SURVEY
  }
}

export function toggleLoading() {
  return { type: TOGGLE_LOADING };
}
