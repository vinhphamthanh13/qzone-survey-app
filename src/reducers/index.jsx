import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import SurveyReducer from 'reducers/reducer_survey';
import SurveyParticipantAnswer from 'reducers/reducer_survey_answers';
import UserReducer from 'reducers/reducer_auth.jsx'

const rootReducer = combineReducers({
  surveys: SurveyReducer,
  session: sessionReducer,
  user: UserReducer,
  surveyParticipantAnswer: SurveyParticipantAnswer,
});

export default rootReducer;
