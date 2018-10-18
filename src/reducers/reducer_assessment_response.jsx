import {
  FETCH_SURVEY_PARTICIPANT_RESPONSE,
  FETCH_SURVEY_PARTICIPANT_LIST,
  FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID,
  FETCH_ALL_SURVEY_ANSWERS,
} from 'services/api/assessment-response';

const initialState = {
  sResponseByParticipant: [],
  allSurveyAnswers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SURVEY_PARTICIPANT_RESPONSE:
      return { ...state, data: action.payload.data };
    case FETCH_ALL_SURVEY_ANSWERS:
      return { ...state, allSurveyAnswers: action.payload.data };
    case FETCH_SURVEY_PARTICIPANT_LIST:
      return { ...state, data: action.payload.data };
    case FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID:
      return { ...state, sResponseByParticipant: action.payload.data };
    default:
      return state;
  }
}
