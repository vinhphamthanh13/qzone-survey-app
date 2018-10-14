import { FETCH_SURVEYS, FETCH_SURVEY, TOGGLE_LOADING } from 'services/api/assessment';
import { UPDATE_PROFILE } from 'services/api/profile';

const initialState = {
  list: [],
  detail: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return {
        ...state,
        list: action.payload.data,
        loading: !action.payload.data.length > 0,
      };
    case FETCH_SURVEY:
      return {
        ...state,
        detail: action.payload.data,
        loading: !action.payload.data.survey !== '',
      };
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case UPDATE_PROFILE:
      return { ...state, loading: false };
    default:
      return state;
  }
}
