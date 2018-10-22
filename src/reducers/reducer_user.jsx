import {
  FETCH_USERTYPE_LIST, FETCH_USER_BY_USERID, TOGGLE_LOADING, FETCH_MULTIPLE_USER_TYPE,
} from 'services/api/user';
import { UPDATE_PROFILE } from 'services/api/profile';

const initialState = {
  userTypeList: [],
  detail: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERTYPE_LIST:
      return { ...state, userTypeList: state.userTypeList.concat(action.payload.data) };
    case FETCH_USER_BY_USERID:
      return { ...state, detail: action.payload.data };
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case UPDATE_PROFILE: {
      if (action.payload.status === 200) {
        return { ...state, detail: { ...state.detail, ...JSON.parse(action.payload.config.data) } };
      }
      return state;
    }
    case FETCH_MULTIPLE_USER_TYPE: {
      const userTypeList = [];
      action.payload.forEach((response) => {
        if (response.status === 200) {
          userTypeList.push(...response.data);
        }
      });
      return { ...state, userTypeList };
    }
    default:
      return state;
  }
}
