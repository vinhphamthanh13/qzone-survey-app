import axios from 'axios';
import { getTokenFromSession } from 'utils/session';
import { REG_SERVICE_URL } from '../../constants';

export const UPDATE_PROFILE = 'update_profile';

const headers = (token) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer ' + token
});

export const updateProfile = async (profile) => {
  const { token } = await getTokenFromSession();
  const axiosConfig = { headers: headers(token) };
  const request = axios.put(`${REG_SERVICE_URL}/updateUser`, profile, axiosConfig);
  return { type: UPDATE_PROFILE, payload: request };
}
