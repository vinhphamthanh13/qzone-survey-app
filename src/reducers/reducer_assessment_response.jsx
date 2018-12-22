import {
  FETCH_SURVEY_PARTICIPANT_RESPONSE,
  FETCH_SURVEY_PARTICIPANT_LIST,
  FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID,
  FETCH_ALL_SURVEY_ANSWERS,
  FETCH_SURVEY_CHART,
  FETCH_RESPONSE_BY_ASSESSMENT_PARTICIPANT_ID,
} from 'services/api/assessment-response';

const initialState = {
  sResponseByParticipant: [],
  allSurveyAnswers: [],
  assessmentResponse: {},
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SURVEY_PARTICIPANT_RESPONSE:
      return { ...state, data: action.payload.data || {} };
    case FETCH_ALL_SURVEY_ANSWERS:
      return { ...state, allSurveyAnswers: action.payload.data };
    case FETCH_SURVEY_PARTICIPANT_LIST:
      return { ...state, data: action.payload.data };
    case FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID:
      return { ...state, sResponseByParticipant: action.payload.data };
    case FETCH_SURVEY_CHART:
      return { ...state, surveyChartData: action.payload.data };
    case FETCH_RESPONSE_BY_ASSESSMENT_PARTICIPANT_ID:
      return { ...state, assessmentResponse: action.payload.data };
    default:
      return state;
  }
}
