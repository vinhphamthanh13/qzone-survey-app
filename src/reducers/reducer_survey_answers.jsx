import { FETCH_SURVEY_PARTICIPANT_RESPONSE } from 'actions/surveyAnswer';
import { FETCH_SURVEY_PARTICIPANT_LIST } from 'actions/surveyAnswer';
import { FETCH_SURVEY_ANSWER_BY_PARTICIPANT_ID } from 'actions/surveyAnswer';
import { FETCH_SURVEY_RESPONSE } from 'actions/surveyAnswer';

const initialState = {
  sAnswersByParticipant: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SURVEY_PARTICIPANT_RESPONSE:
      return {...state, data: action.payload.data}
    case FETCH_SURVEY_RESPONSE:
      return {...state, data: action.payload.data}
    case FETCH_SURVEY_PARTICIPANT_LIST:
      return {...state, data: action.payload.data}
    case FETCH_SURVEY_ANSWER_BY_PARTICIPANT_ID:
      return {...state, sAnswersByParticipant: action.payload.data}      
    default:
      return state;
  }
}
