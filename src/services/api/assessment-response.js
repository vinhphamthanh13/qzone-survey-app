import axios from 'axios';
import makeHeaders from '../helper/makeHeaders';
import { SURVEY_URL } from '../../constants';

export const CREATE_SURVEY_ANSWER = 'create_survey_answer';
export const FETCH_SURVEY_PARTICIPANT_RESPONSE = 'fetch_survey_participant_response';
export const FETCH_SURVEY_RESPONSE = 'fetch_survey_response';
export const FETCH_SURVEY_PARTICIPANT_LIST = 'fetch_survey_participant_list';
export const FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID = 'fetch_survey_answer_by_participant_id';

export async function createSurveyResponse(values, token, callback) {
  const axiosConfig = { headers: await makeHeaders() };
  axios.post(`${SURVEY_URL}/survey-answers`, values, axiosConfig)
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

export async function fetchSurveyParticipantResponse(pid, sid) {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${SURVEY_URL}/find-survey-answers/${sid}/${pid}`, axiosConfig);
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

export async function fetchSurveyParticipantList(sid) {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${SURVEY_URL}/list-participant-by-survey-id/${sid}`, axiosConfig);
  return {
    type: FETCH_SURVEY_PARTICIPANT_LIST,
    payload: request,
  };
}

export async function fetchSurveyAnswerByParticipantId(pid) {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${SURVEY_URL}/list-survey-answer-by-participant-id/${pid}`, axiosConfig);
  return {
    type: FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID,
    payload: request,
  };
}
