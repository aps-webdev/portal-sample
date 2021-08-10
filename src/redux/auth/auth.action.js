import { authActionType } from './auth.type';

export const setUserAuth = (isAuthorized) => ({
  type: authActionType.SET_IS_AUTHORIZED,
  payload: isAuthorized,
});

export const setRecruiterLogged = (isRecruiter) => ({
  type: authActionType.SET_IS_RECRUITER_LOGGED_IN,
  payload: isRecruiter,
});

export const setUserName = (name) => ({
  type: authActionType.SET_USER_NAME,
  payload: name,
});

export const setBodyHeight = (height) => ({
  type: authActionType.SET_BODY_HEIGHT,
  payload: height,
});
