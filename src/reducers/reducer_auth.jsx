import { FETCH_USERTYPE_LIST} from 'actions/auth';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USERTYPE_LIST:
      return {...state, data: action.payload.data}
    default:
      return state;
  }
}
