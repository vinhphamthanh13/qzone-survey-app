import axios from 'axios';

export const FETCH_SURVEYS = 'fetch_surveys';
export const CREATE_SURVEY = 'create_survey';
export const FETCH_SURVEY = 'fetch_survey';
export const DELETE_SURVEY = 'delete_survey';
export const DELETE_ALL_SURVEY = 'delete_all_survey';
export const EDIT_SURVEY = 'edit_survey';

const ROOT_URL = `http://45.117.170.211:8090/api/surveys`

export function fetchSurveys(token) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  const request = axios.get(ROOT_URL, axiosConfig)
  return {
    type: FETCH_SURVEYS,
    payload: request
  };
}

export function fetchSurvey(id,token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  const request = axios.get(`${ROOT_URL}/${id}`, axiosConfig)
  return {
    type: FETCH_SURVEY,
    payload: request
  };
}

export function deleteSurvey(id,token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  axios.delete(`${ROOT_URL}/${id}`,axiosConfig)
    .then(() => callback())
  return {
    type: DELETE_SURVEY
  };
}


export function deleteAllSurvey(id,token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  axios.delete(ROOT_URL, axiosConfig)
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

export function createSurvey(values,token,callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  axios.post(ROOT_URL,values, axiosConfig)
    .then((response) => callback(response));
  return {
    type: CREATE_SURVEY
  }
}

export function editSurvey(values,token,callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  axios.put(ROOT_URL,values, axiosConfig)
    .then(() => callback());
  return {
    type: EDIT_SURVEY
  }
}
