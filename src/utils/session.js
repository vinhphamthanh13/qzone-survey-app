import { sessionService } from 'redux-react-session';

export async function getTokenFromSession() {
  return await sessionService.loadSession();
};

export async function getUserFromSession() {
  return await sessionService.loadUser();
};
