import { combineReducers } from 'redux';
import SurveyReducer from 'reducers/reducer_survey';
import SurveyParticipantAnswer from 'reducers/reducer_survey_answers';

const rootReducer = combineReducers({
  surveys: SurveyReducer,
  surveyParticipantAnswer: SurveyParticipantAnswer
});

export default rootReducer;
