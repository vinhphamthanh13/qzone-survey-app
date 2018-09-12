import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import SurveyReducer from 'reducers/reducer_survey';
import SurveyParticipantAnswer from 'reducers/reducer_survey_answers';

const rootReducer = combineReducers({
  surveys: SurveyReducer,
  session: sessionReducer,
  surveyParticipantAnswer: SurveyParticipantAnswer,
});

export default rootReducer;
