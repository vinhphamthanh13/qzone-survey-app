import axios from 'axios';

export const FETCH_SURVEYS = 'fetch_surveys';
export const CREATE_SURVEY = 'create_survey';
export const FETCH_SURVEY = 'fetch_survey';
export const DELETE_SURVEY = 'delete_survey';
export const DELETE_ALL_SURVEY = 'delete_all_survey';
export const EDIT_SURVEY = 'edit_survey';

const ROOT_URL = `http://13.211.215.72:8092/api/surveys`

export function fetchSurveys() {
  const request = axios.get(ROOT_URL)
  return {
    type: FETCH_SURVEYS,
    payload: request
  };
}

export function fetchSurvey(id, callback) {
  const request = axios.get(`${ROOT_URL}/${id}`)
  return {
    type: FETCH_SURVEY,
    payload: request
  };
}

export function deleteSurvey(id, callback) {
  axios.delete(`${ROOT_URL}/${id}`)
    .then(() => callback())
  return {
    type: DELETE_SURVEY
  };
}


export function deleteAllSurvey(id, callback) {
  axios.delete(ROOT_URL)
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

export function createSurvey(values,callback) {
  axios.post(ROOT_URL,values)
    .then((response) => callback(response));
  return {
    type: CREATE_SURVEY
  }
}

export function editSurvey(values,callback) {
  axios.put(ROOT_URL,values)
    .then(() => callback());
  return {
    type: EDIT_SURVEY
  }
}
