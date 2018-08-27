import axios from 'axios';

export const FETCH_SURVEYS = 'fetch_surveys';
export const CREATE_SURVEY = 'create_survey';
export const FETCH_SURVEY = 'fetch_survey';
export const DELETE_SURVEY = 'delete_survey';


const ROOT_URL = `http://45.117.170.211:8090/api/surveys`

export function fetchSurveys() {
  const request = axios.get(ROOT_URL)
  return {
    type: FETCH_SURVEYS,
    payload: request
  };
}

export function fetchSurvey(id, callback) {
  const request = axios.get(`${ROOT_URL}/{id}?id=${id}`)
  return {
    type: FETCH_SURVEY,
    payload: request
  };
}

export function deleteSurvey(id, callback) {
  axios.delete(`${ROOT_URL}/{id}?id=${id}`)
  return {
    type: DELETE_SURVEY
  };
}

export function createSurvey(values,callback) {
  axios.post(ROOT_URL,values)
    .then(() => callback());
  return {
    type: CREATE_SURVEY
  }
}
