import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useLoginController } from './useLoginController';
import {
  setBodyHeight,
  setRecruiterLogged,
  setUserAuth,
  setUserName,
} from '../../redux/auth/auth.action';

import './LoginPage.styles.scss';
import Input from '../../components/Input/Input.index';
import Button from '../../components/Button/Button.index';
import { selectAuth } from '../../redux/auth/auth.selector';

function LoginPage(props) {
  const {
    handleSubmit,
    formRef,
    isLoginValid,
    message,
    handleSignup,
    handleForgotPassword,
    handleInputChange,
  } = useLoginController(props);

  const bodyRef = useRef(null);

  useEffect(() => {
    props.setBodyHeight(bodyRef.current.clientHeight);
  }, [props]);
  
  return (
    <React.Fragment>
      <div className='login' ref={bodyRef}>
        <div className='title'>Login</div>
        <form noValidate onSubmit={handleSubmit} ref={formRef}>
          <Input
            label='Email address'
            type='email'
            name='email'
            placeholder='Enter your email'
            required
            isValid={isLoginValid}
            onChange={handleInputChange}
          />
          <div className='forgotpassword' onClick={handleForgotPassword}>
            Forgot your password?
          </div>
          <Input
            label='Password'
            type='password'
            name='password'
            placeholder='Enter your password'
            required
            isValid={isLoginValid}
            onChange={handleInputChange}
            style={{ marginTop: '19px' }}
          />
          <div className={`message${!isLoginValid ? ' mandatory' : ''}`}>
            {message}
          </div>
          <div className='login_button'>
            <Button primary type='submit'>
              Login
            </Button>
          </div>
        </form>
        <div className='footer'>
          New to MyJobs?{' '}
          <span className='footer_text' onClick={handleSignup}>
            Create an account
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (isLoggedIn) => dispatch(setUserAuth(isLoggedIn)),
  setRecruiterLogged: (isRecruiter) =>
    dispatch(setRecruiterLogged(isRecruiter)),
  setUserName: (name) => dispatch(setUserName(name)),
  setBodyHeight: (height) => dispatch(setBodyHeight(height)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
