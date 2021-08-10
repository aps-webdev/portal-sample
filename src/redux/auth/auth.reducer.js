import { authActionType } from './auth.type';

const INITIAL_STATE = {
  isLoggedIn: false,
  isRecruiterLoggedIn: false,
  userName: '',
  height: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authActionType.SET_IS_AUTHORIZED:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case authActionType.SET_IS_RECRUITER_LOGGED_IN:
      return {
        ...state,
        isRecruiterLoggedIn: action.payload,
      };
    case authActionType.SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    case authActionType.SET_BODY_HEIGHT:
      return {
        ...state,
        height: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
