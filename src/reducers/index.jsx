import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import SurveyReducer from 'reducers/reducer_assessment';
import SurveyParticipantAnswer from 'reducers/reducer_assessment_response';
import UserReducer from 'reducers/reducer_user';

const rootReducer = combineReducers({
  surveys: SurveyReducer,
  session: sessionReducer,
  user: UserReducer,
  surveyParticipantAnswer: SurveyParticipantAnswer,
});

export default rootReducer;
