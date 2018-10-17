import axios from 'axios';
import makeHeaders from '../helper/makeHeaders';
import { REG_SERVICE_URL } from '../../constants';

export const UPDATE_PROFILE = 'update_profile';

export const updateProfile = async (profile) => {
  const axiosConfig = { headers: await makeHeaders() };
  const request = axios.put(`${REG_SERVICE_URL}/updateUser`, profile, axiosConfig);
  return { type: UPDATE_PROFILE, payload: request };
};
