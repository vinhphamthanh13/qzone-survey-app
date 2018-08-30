import axios from 'axios';

export const CREATE_SURVEY_ANSWER = 'create_survey_answer';

const ROOT_URL = `http://45.117.170.211:8090/api/survey-answers`

export function createSurveyAnswer(values,callback) {
  axios.post(ROOT_URL,values)
    .then((response) => callback(response));
  return {
    type: CREATE_SURVEY_ANSWER
  }
}
