import { getTokenFromSession } from 'utils/session';

let headerCache = null;

const makeHeaders = async () => {
  if (!headerCache) {
    const { token } = await getTokenFromSession();
    headerCache = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }
  return headerCache;
};

export default makeHeaders;
