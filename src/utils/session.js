import { sessionService } from 'redux-react-session';

export async function getTokenFromSession() {
  return sessionService.loadSession();
}

export async function getUserFromSession() {
  return sessionService.loadUser();
}
