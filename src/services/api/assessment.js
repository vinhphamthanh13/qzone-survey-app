import axios from 'axios';
import { SURVEY_URL } from '../../constants';

export const FETCH_SURVEYS = 'fetch_surveys';
export const CREATE_SURVEY = 'create_survey';
export const FETCH_SURVEY = 'fetch_survey';
export const DELETE_SURVEY = 'delete_survey';
export const DELETE_ALL_SURVEY = 'delete_all_survey';
export const EDIT_SURVEY = 'edit_survey';
export const TOGGLE_LOADING = 'survey_toggle_loading';

const reqHeaderContent = 'application/json';
const axiosConfig = token => ({
  headers: {
    'Content-Type': reqHeaderContent,
    Accept: reqHeaderContent,
    Authorization: `Bearer ${token}`,
  },
});

export function fetchSurveys(token) {
  const request = axios.get(`${SURVEY_URL}/surveys`, axiosConfig(token));
  return {
    type: FETCH_SURVEYS,
    payload: request,
  };
}

export function fetchSurveysByAssessorId(userId, token) {
  const request = axios.get(`${SURVEY_URL}/find-survey-by-assessor-id/${userId}`, axiosConfig(token));
  return {
    type: FETCH_SURVEYS,
    payload: request,
  };
}

export function fetchSurvey(id, token) {
  const request = axios.get(`${SURVEY_URL}/surveys/${id}`, axiosConfig(token));
  return {
    type: FETCH_SURVEY,
    payload: request,
  };
}

export function deleteSurvey(id, token, callback) {
  axios.delete(`${SURVEY_URL}/surveys/${id}`, axiosConfig(token))
    .then(() => callback());
  return {
    type: DELETE_SURVEY,
  };
}

export function deleteAllSurvey(id, token, callback) {
  axios.delete(`${SURVEY_URL}/surveys`, axiosConfig(token))
    .then(
      (response) => {
        callback(response);
      },
      (error) => {
        callback(error.response);
        return error.response;
      },
    );
  return {
    type: DELETE_ALL_SURVEY,
  };
}

export function createSurvey(values, token, callback) {
  axios.post(`${SURVEY_URL}/surveys`, values, axiosConfig(token))
    .then(response => callback(response));
  return {
    type: CREATE_SURVEY,
  };
}

export function editSurvey(values, token, callback) {
  axios.put(`${SURVEY_URL}/surveys`, values, axiosConfig(token))
    .then(() => callback());
  return {
    type: EDIT_SURVEY,
  };
}

export function toggleLoading() {
  return { type: TOGGLE_LOADING };
}
