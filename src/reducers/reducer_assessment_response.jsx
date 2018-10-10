import {
  FETCH_SURVEY_PARTICIPANT_RESPONSE,
  FETCH_SURVEY_PARTICIPANT_LIST,
  FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID,
  FETCH_SURVEY_RESPONSE
} from 'services/api/assessment-response';

const initialState = {
  sResponseByParticipant: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SURVEY_PARTICIPANT_RESPONSE:
      return { ...state, data: action.payload.data }
    case FETCH_SURVEY_RESPONSE:
      return { ...state, data: action.payload.data }
    case FETCH_SURVEY_PARTICIPANT_LIST:
      return { ...state, data: action.payload.data }
    case FETCH_SURVEY_RESPONSE_BY_PARTICIPANT_ID:
      return { ...state, sResponseByParticipant: action.payload.data }
    default:
      return state;
  }
}
