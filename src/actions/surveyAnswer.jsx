import axios from 'axios';
import { SURVEY_URL } from '../constants';

export const CREATE_SURVEY_ANSWER = 'create_survey_answer';
export const FETCH_SURVEY_PARTICIPANT_RESPONSE = 'fetch_survey_participant_response';
export const FETCH_SURVEY_RESPONSE = 'fetch_survey_response';
export const FETCH_SURVEY_PARTICIPANT_LIST = 'fetch_survey_participant_list';
export const FETCH_SURVEY_ANSWER_BY_PARTICIPANT_ID = 'fetch_survey_answer_by_participant_id';

export function createSurveyAnswer(values, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  axios.post(`${SURVEY_URL}/survey-answers`, values, axiosConfig)
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
    type: CREATE_SURVEY_ANSWER
  }
}

export function fetchSurveyParticipantResponse(pid, sid, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  const request = axios.get(`${SURVEY_URL}/find-survey-answers/{surveyId}/{participantId}?surveyId=${sid}&participantId=${pid}`, axiosConfig)
  return {
    type: FETCH_SURVEY_PARTICIPANT_RESPONSE,
    payload: request
  }
}

export function fetchSurveyResponse(sid, callback) {
  const request = axios.get(`${SURVEY_URL}/find-survey-answers/{surveyId}?surveyId=${sid}`)
  return {
    type: FETCH_SURVEY_RESPONSE,
    payload: request
  }
}

export function fetchSurveyParticipantList(sid, token, callback) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  const request = axios.get(`${SURVEY_URL}/listParticipantBySurveyId/${sid}`, axiosConfig)
  return {
    type: FETCH_SURVEY_PARTICIPANT_LIST,
    payload: request
  }
}

export function fetchSurveyAnswerByParticipantId(pid, token) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
  const request = axios.get(`${SURVEY_URL}/listSurveyAnswerByParticipantId/${pid}`, axiosConfig)
  return {
    type: FETCH_SURVEY_ANSWER_BY_PARTICIPANT_ID,
    payload: request
  }
}

