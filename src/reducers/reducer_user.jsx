import {
  FETCH_USERTYPE_LIST,
  FETCH_USER_BY_USERID,
  TOGGLE_LOADING,
  FETCH_MULTIPLE_USER_TYPE,
  FORCE_RESET_PASSWORD,
  UPDATE_USER,
  DELETE_USER,
} from 'services/api/user';
import { UPDATE_PROFILE } from 'services/api/profile';
import { FETCH_SURVEY } from 'services/api/assessment';

const initialState = {
  userTypeList: [],
  detail: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERTYPE_LIST: {
      return { ...state, userTypeList: action.payload.data };
    }
    case FETCH_USER_BY_USERID:
      return { ...state, detail: action.payload.data };
    case FETCH_SURVEY:
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case UPDATE_PROFILE: {
      if (action.payload.status === 200) {
        return { ...state, detail: { ...state.detail, ...JSON.parse(action.payload.config.data) } };
      }
      return state;
    }
    case FORCE_RESET_PASSWORD: {
      if (action.payload && action.payload.status === 200) {
        return { ...state, forceChangePasswordSuccess: true };
      }
      return { ...state };
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
    case UPDATE_USER:
      return {
        ...state,
        userTypeList: state.userTypeList.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        userTypeList: state.userTypeList.filter(user => user.id !== action.payload.id),
      };
    default:
      return state;
  }
}
