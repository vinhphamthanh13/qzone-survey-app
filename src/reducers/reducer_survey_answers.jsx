import { FETCH_SURVEY_PARTICIPANT_RESPONSE } from 'actions/surveyAnswer';
import { FETCH_SURVEY_RESPONSE } from 'actions/surveyAnswer';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SURVEY_PARTICIPANT_RESPONSE:
      return {...state, data: action.payload.data}
    case FETCH_SURVEY_RESPONSE:
      return {...state, data: action.payload.data}
    default:
      return state;
  }
}
