import axios from 'axios';

export const CREATE_SURVEY_ANSWER = 'create_survey_answer';
export const FETCH_SURVEY_PARTICIPANT_RESPONSE = 'fetch_survey_participant_response';
export const FETCH_SURVEY_RESPONSE = 'fetch_survey_response';
export const FETCH_SURVEY_PARTICIPANT_LIST = 'fetch_survey_participant_list';

const ROOT_URL = `http://45.117.170.211:8090/api`

export function createSurveyAnswer(values,token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  axios.post(`${ROOT_URL}/survey-answers`,values, axiosConfig)
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
    type: CREATE_SURVEY_ANSWER
  }
}

export function fetchSurveyParticipantResponse(pid,sid,token,callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  const request = axios.get(`${ROOT_URL}/find-survey-answers/{surveyId}/{participantId}?surveyId=${sid}&participantId=${pid}`,axiosConfig)
  return {
    type: FETCH_SURVEY_PARTICIPANT_RESPONSE,
    payload: request
  }
}

export function fetchSurveyResponse(sid,callback) {
  const request = axios.get(`${ROOT_URL}/find-survey-answers/{surveyId}?surveyId=${sid}`)
  return {
    type: FETCH_SURVEY_RESPONSE,
    payload: request
  }
}

export function fetchSurveyParticipantList(sid,callback) {
  const request = axios.get(`${ROOT_URL}/listParticipantBySurveyId/{surveyId}?surveyId=${sid}`)
  return {
    type: FETCH_SURVEY_PARTICIPANT_LIST,
    payload: request
  }
}

