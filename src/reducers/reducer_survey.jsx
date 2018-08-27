import { FETCH_SURVEYS } from 'actions/survey';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return {...state, data: action.payload.data}
    default:
      return state;
  }
}