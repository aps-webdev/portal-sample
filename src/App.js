import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Helper from './helpers/rootBody';

import Header from './components/Header/Header.index';
import HomePage from './container/HomePages/Homepage.index';
import LandingPage from './container/LandingPage/LandingPage.index';
import LoginPage from './container/LoginPage/LoginPage.index';
import SignUpPage from './container/SignUpPage/SignUpPage.index';
import ForgotPasswordPage from './container/ForgotPasswordPage/ForgotPassword.index';
import PostAJob from './container/PostAJobPage/PostAJob.index.jsx';
import PageNotFound from './components/NotFound/NotFound.index';
import {
  selectAuth,
  selectIsRecruiterLogged,
  selectUserName,
} from './redux/auth/auth.selector';
import {
  clearSessionStorage,
  getSessionStorage,
} from './helpers/sessionStorage';

function App(props) {
  const history = useHistory();

  const handleHomePageClick = () => {
    clearSessionStorage();
    history.push('/');
  };

  let isLoggedIn = !!getSessionStorage('token') ? true : false;
  let isRecruiter = getSessionStorage('userRole') === '0' ? true : false;

  return (
    <React.Fragment>
      <Header
        isLoggedIn={props.isLoggedIn}
        isRecruiter={props.isRecruiter}
        name={props.name}
      />
      <Switch>
        <Route
          exact
          path='/'
          render={() =>
            isLoggedIn && isRecruiter ? (
              <Redirect to='/recruiter' />
            ) : isLoggedIn && !isRecruiter ? (
              <Redirect to='/candidate' />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          exact
          path='/login'
          render={() =>
            isLoggedIn && isRecruiter ? (
              <Redirect to='/recruiter' />
            ) : isLoggedIn && !isRecruiter ? (
              <Redirect to='/candidate' />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          exact
          path='/signup'
          render={() =>
            isLoggedIn && isRecruiter ? (
              <Redirect to='/recruiter' />
            ) : isLoggedIn && !isRecruiter ? (
              <Redirect to='/candidate' />
            ) : (
              <SignUpPage />
            )
          }
        />
        <Route path='/changepassword' component={ForgotPasswordPage} />
        <Route
          exact
          path='/recruiter'
          render={() => (!isLoggedIn ? <Redirect to='/' /> : <HomePage />)}
        />
        <Route
          exact
          path='/recruiter/postjob'
          render={() =>
            isLoggedIn && isRecruiter ? <PostAJob /> : <Redirect to='/' />
          }
        />
        <Route
          exact
          path='/candidate'
          render={() =>
            isLoggedIn && !isRecruiter ? <HomePage /> : <Redirect to='/' />
          }
        />
        <Route
          exact
          path='/candidate/alljobs'
          render={() =>
            isLoggedIn && isRecruiter ? <Redirect to='/' /> : <HomePage />
          }
        />
        <Route
          path='*'
          render={(props) => (
            <PageNotFound
              {...props}
              handleHomePageClick={handleHomePageClick}
            />
          )}
        />
      </Switch>
      <Helper />
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectAuth,
  isRecruiter: selectIsRecruiterLogged,
  name: selectUserName,
});

export default withRouter(connect(mapStateToProps, null)(App));
