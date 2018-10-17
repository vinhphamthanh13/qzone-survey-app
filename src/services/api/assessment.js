import axios from 'axios';
import makeHeaders from '../helper/makeHeaders';
import { SURVEY_URL } from '../../constants';

export const FETCH_SURVEYS = 'fetch_surveys';
export const CREATE_SURVEY = 'create_survey';
export const FETCH_SURVEY = 'fetch_survey';
export const DELETE_SURVEY = 'delete_survey';
export const DELETE_ALL_SURVEY = 'delete_all_survey';
export const EDIT_SURVEY = 'edit_survey';
export const TOGGLE_LOADING = 'survey_toggle_loading';

export async function fetchSurveys() {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${SURVEY_URL}/surveys`, axiosConfig);
  return {
    type: FETCH_SURVEYS,
    payload: request,
  };
}

export async function fetchSurveysByAssessorId(userId) {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${SURVEY_URL}/find-survey-by-assessor-id/${userId}`, axiosConfig);
  return {
    type: FETCH_SURVEYS,
    payload: request,
  };
}

export async function fetchSurvey(id) {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${SURVEY_URL}/surveys/${id}`, axiosConfig);
  return {
    type: FETCH_SURVEY,
    payload: request,
  };
}

export async function deleteSurvey(id, token, callback) {
  const axiosConfig = { headers: await makeHeaders() };
  axios.delete(`${SURVEY_URL}/surveys/${id}`, axiosConfig)
    .then(() => callback());
  return {
    type: DELETE_SURVEY,
  };
}

export async function deleteAllSurvey(id, token, callback) {
  const axiosConfig = { headers: await makeHeaders() };
  axios.delete(`${SURVEY_URL}/surveys`, axiosConfig)
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

export async function createSurvey(values, token, callback) {
  const axiosConfig = { headers: await makeHeaders() };
  axios.post(`${SURVEY_URL}/surveys`, values, axiosConfig)
    .then(response => callback(response));
  return {
    type: CREATE_SURVEY,
  };
}

export async function editSurvey(values, token, callback) {
  const axiosConfig = { headers: await makeHeaders() };
  axios.put(`${SURVEY_URL}/surveys`, values, axiosConfig)
    .then(() => callback());
  return {
    type: EDIT_SURVEY,
  };
}

export function toggleLoading() {
  return { type: TOGGLE_LOADING };
}
