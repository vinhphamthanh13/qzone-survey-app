import {
  FETCH_USERTYPE_LIST, FETCH_USER_BY_USERID, TOGGLE_LOADING, FORCE_RESET_PASSWORD,
} from 'services/api/user';
import { UPDATE_PROFILE } from 'services/api/profile';
import { eUserType } from '../constants';

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
    case FORCE_RESET_PASSWORD:
      return { ...state, isDefaultPwdChanged: action.payload };
    case eUserType.temporary: {
      if (action.payload && action.payload.status === 200) {
        return { ...state, forceChangePasswordSuccess: true };
      }
      return { ...state };
    }
    default:
      return state;
  }
}
