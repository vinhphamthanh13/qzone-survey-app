import axios from 'axios';

export const CREATE_SURVEY_ANSWER = 'create_survey_answer';
export const FETCH_SURVEY_PARTICIPANT_RESPONSE = 'fetch_survey_participant_response';

const ROOT_URL = `http://45.117.170.211:8090/api/survey-answers`

export function createSurveyAnswer(values,callback) {
  axios.post(ROOT_URL,values)
    .then((response) => callback(response));
  return {
    type: CREATE_SURVEY_ANSWER
  }
}

export function fetchSurveyParticipantResponse(pid,sid,callback) {
  const request = axios.get(ROOT_URL,{pid, sid})
    .then((response) => callback(response));
  return {
    type: FETCH_SURVEY_PARTICIPANT_RESPONSE
  }
}
