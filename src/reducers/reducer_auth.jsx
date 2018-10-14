import { FETCH_USERTYPE_LIST, FETCH_USER_BY_USERID, TOGGLE_LOADING } from 'services/api/auth';
import { UPDATE_PROFILE } from 'services/api/profile';

const initialState = {
  userTypeList: [],
  detail: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERTYPE_LIST:
      return { ...state, userTypeList: action.payload.data };
    case FETCH_USER_BY_USERID:
      return { ...state, detail: action.payload.data };
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case UPDATE_PROFILE: {
      if (action.payload.status === 200) {
        return { ...state, detail: { ...state.detail, ...JSON.parse(action.payload.config.data) } };
      }
      return { ...state };
    }
    default:
      return state;
  }
}
