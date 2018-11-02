import axios from 'axios';
import makeHeaders from '../helper/makeHeaders';
import { SURVEY_URL } from '../../constants';

export const CREATE_SURVEY_ANSWER = 'create_survey_answer';
export const FETCH_SURVEY_PARTICIPANT_RESPONSE = 'fetch_survey_participant_response';
export const FETCH_ALL_SURVEY_ANSWERS = 'fetch_all_survey_answers';
export const FETCH_SURVEY_PARTICIPANT_LIST = 'fetch_survey_participant_list';
export const FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID = 'fetch_survey_answer_by_participant_id';
export const FETCH_RESPONSE_BY_ASSESSMENT_PARTICIPANT_ID = 'fetch_response_by_assessment_participant_id';

export async function createSurveyResponse(values, callback) {
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

export async function fetchAllSurveyAnswers() {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${SURVEY_URL}/survey-answers`, axiosConfig);
  return {
    type: FETCH_ALL_SURVEY_ANSWERS,
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

export const fetchResponseByAssessmentAndParticipantId = async (aId, uId) => {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.get(`${SURVEY_URL}/find-survey-answers/${aId}/${uId}`, axiosConfig);
  return {
    type: FETCH_RESPONSE_BY_ASSESSMENT_PARTICIPANT_ID,
    payload: request,
  };
};
