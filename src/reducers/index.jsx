import { combineReducers } from 'redux';
import SurveyReducer from 'reducers/reducer_survey';
const rootReducer = combineReducers({
  surveys: SurveyReducer
});

export default rootReducer;
