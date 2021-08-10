import { createSelector } from 'reselect';

const authSelector = (state) => state.auth;

export const selectAuth = createSelector(
  authSelector,
  (auth) => auth.isLoggedIn
);

export const selectIsRecruiterLogged = createSelector(
  authSelector,
  (auth) => auth.isRecruiterLoggedIn
);

export const selectUserName = createSelector(
  authSelector,
  (auth) => auth.userName
);

export const selectHeight = createSelector(authSelector, (auth) => auth.height);
