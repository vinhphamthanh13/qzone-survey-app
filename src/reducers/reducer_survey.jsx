import { FETCH_SURVEYS } from 'actions/survey';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      // return {...state, data: action.payload.data.data}
      console.log(action.payload)
      console.log("LLLLLLLLLLL")
      // return state
    
    default:

      return state;
  }
}