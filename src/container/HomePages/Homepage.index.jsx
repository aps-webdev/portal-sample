import React from 'react';
import { getSessionStorage } from '../../helpers/sessionStorage';

import CandidateHomePage from './CandidatePage';
import RecruitHomePage from './RecruiterPage';

const Homepage = (props) => {
  const isRecruiter = getSessionStorage('userRole') === '0' ? true : false;
  const isLoggedIn = !!getSessionStorage('token') ? true : false;

  return (
    <React.Fragment>
      {isLoggedIn && isRecruiter ? (
        <RecruitHomePage {...props} />
      ) : (
        <CandidateHomePage {...props} />
      )}
    </React.Fragment>
  );
};

export default Homepage;
