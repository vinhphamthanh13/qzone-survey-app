import { FETCH_SURVEYS, FETCH_SURVEY, TOGGLE_LOADING } from 'actions/survey';

const initialState = {
  list: [],
  detail: {},
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { ...state, list: action.payload.data };
    case FETCH_SURVEY:
      return { ...state, detail: action.payload.data };
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}