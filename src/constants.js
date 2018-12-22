export const eUserType = {
  participant: 'PARTICIPANT',
  assessor: 'ASSESSOR',
  provider: 'PROVIDER',
  sponsor: 'SPONSOR',
  admin: 'ADMIN',
};

export const ASUser = [
  { userType: eUserType.assessor },
  { userType: eUserType.sponsor },
];

export const eSurveyStatus = {
  completed: 'COMPLETED',
  inProgress: 'INPROGRESS',
  pending: 'PENDING',
  expired: 'EXPIRED',
};

export const surveyLocalData = {
  SURVEY_ID: 'SurveyId',
  USER_TYPE: 'UserType',
};

export const eRegisterPage = {
  eReceivedInfo: 'eReceivedInfo',
  registerTermAndCondition: 'registerTermAndCondition',
};

export const userStatus = {
  unconfirmed: 'UNCONFIRMED',
  confirmed: 'CONFIRMED',
  temporary: 'NEW_PASSWORD_REQUIRED',
  changePassword: 'FORCE_CHANGE_PASSWORD',

};

export const SURVEY_APP_URL = 'testengage.quezone.com.au';
// export const SURVEY_APP_URL = 'localhost:3000';
export const REG_SERVICE_URL = 'http://54.252.134.87:8091/api/user';
// export const REG_SERVICE_URL = 'http://localhost:8091/api/user';
export const SURVEY_URL = 'http://54.252.134.87:8090/api';
// export const SURVEY_URL = 'http://localhost:8090/api';

export const CTA = {
  DELETE: 'delete',
  DELETE_CONFIRMED: 'deleted',
};

export const AUTH_PAGE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export const LOGO_FALLBACK1 = 'https://logo.clearbit.com/quizlet.com';
export const LOGO_FALLBACK2 = 'https://logo.clearbit.com/quizlet.nl';
