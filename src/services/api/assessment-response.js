import axios from 'axios';
import { SURVEY_URL } from '../../constants';

export const CREATE_SURVEY_ANSWER = 'create_survey_answer';
export const FETCH_SURVEY_PARTICIPANT_RESPONSE = 'fetch_survey_participant_response';
export const FETCH_SURVEY_RESPONSE = 'fetch_survey_response';
export const FETCH_SURVEY_PARTICIPANT_LIST = 'fetch_survey_participant_list';
export const FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID = 'fetch_survey_answer_by_participant_id';

const reqHeaderContent = 'application/json';
const axiosConfig = token => ({
  headers: {
    'Content-Type': reqHeaderContent,
    Accept: reqHeaderContent,
    Authorization: `Bearer ${token}`,
  },
});

export function createSurveyResponse(values, token, callback) {
  axios.post(`${SURVEY_URL}/survey-answers`, values, axiosConfig(token))
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
    type: CREATE_SURVEY_ANSWER,
  };
}

export function fetchSurveyParticipantResponse(pid, sid, token) {
  const request = axios.get(`${SURVEY_URL}/find-survey-answers/${sid}/${pid}`, axiosConfig(token));
  return {
    type: FETCH_SURVEY_PARTICIPANT_RESPONSE,
    payload: request,
  };
}

export function fetchSurveyResponse(sid) {
  const request = axios.get(`${SURVEY_URL}/find-survey-answers/${sid}`);
  return {
    type: FETCH_SURVEY_RESPONSE,
    payload: request,
  };
}

export function fetchSurveyParticipantList(sid, token) {
  const request = axios.get(`${SURVEY_URL}/list-participant-by-survey-id/${sid}`, axiosConfig(token));
  return {
    type: FETCH_SURVEY_PARTICIPANT_LIST,
    payload: request,
  };
}

export function fetchSurveyAnswerByParticipantId(pid, token) {
  const request = axios.get(`${SURVEY_URL}/list-survey-answer-by-participant-id/${pid}`, axiosConfig(token));
  return {
    type: FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID,
    payload: request,
  };
}
