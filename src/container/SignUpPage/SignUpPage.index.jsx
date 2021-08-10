import React, { useEffect, useRef } from 'react';
import './SignUpPage.styles.scss';
import Input from '../../components/Input/Input.index';
import Button from '../../components/Button/Button.index';
import Recruiter_primary from '../../assets/recruiter_primary.png';
import Recruiter_secondary from '../../assets/recruiter_secondary.png';
import Candidate_primary from '../../assets/candidates_primary.png';
import Candidate_secondary from '../../assets/candidates_secondary.png';
import { useSignUpController } from './useSignUpController';
import { Toast } from '../../components/Toast/Toast.index';
import { connect } from 'react-redux';
import { setBodyHeight } from '../../redux/auth/auth.action';

function SignUpPage(props) {
  const {
    isCandidateActive,
    isRecuiterActive,
    isSignUpValid,
    handleInputChange,
    handleSubmit,
    toggleSignUpForm,
    message,
    handleLogin,
    formRef,
    signUpFormErrorMessage,
    toastRef,
  } = useSignUpController(props);

  const bodyRef = useRef(null);

  useEffect(() => {
    props.setBodyHeight(bodyRef.current.clientHeight);
  }, [props]);

  return (
    <React.Fragment>
      <div className='signup' ref={bodyRef}>
        <div className='title'>Signup</div>
        <div className='userChoice'>
          <p>I'm a*</p>
          <div className='userButtons'>
            <Button
              icon={isRecuiterActive ? Recruiter_primary : Recruiter_secondary}
              primary={isRecuiterActive}
              secondary={isCandidateActive}
              style={{ width: '136px', marginRight: '20px' }}
              onClick={toggleSignUpForm}
            >
              Recruiter
            </Button>
            <Button
              icon={
                !isCandidateActive ? Candidate_secondary : Candidate_primary
              }
              primary={!isRecuiterActive}
              secondary={!isCandidateActive}
              style={{ width: '136px' }}
              onClick={toggleSignUpForm}
            >
              Candidate
            </Button>
          </div>
        </div>
        <form noValidate onSubmit={handleSubmit} ref={formRef}>
          <Input
            label='Full Name*'
            type='text'
            name='name'
            placeholder='Enter your full name'
            required
            isValid={isSignUpValid}
            onChange={handleInputChange}
          />
          <div className={`message${!isSignUpValid ? ' mandatory' : ''}`}>
            {signUpFormErrorMessage.name}
          </div>
          <Input
            label='Email address*'
            type='text'
            name='email'
            placeholder='Enter your email'
            required
            isValid={isSignUpValid}
            style={{ marginTop: '25px' }}
            onChange={handleInputChange}
          />
          <div className={`message${!isSignUpValid ? ' mandatory' : ''}`}>
            {signUpFormErrorMessage.email}
          </div>

          <div className='signup_passwords'>
            <div className='passwordGroup'>
              <Input
                label='Create Password*'
                type='password'
                name='password'
                placeholder='Enter your password'
                required
                isValid={isSignUpValid}
                onChange={handleInputChange}
              />
              <div className={`message${!isSignUpValid ? ' mandatory' : ''}`}>
                {signUpFormErrorMessage.password}
              </div>
            </div>
            <div className='confirm passwordGroup'>
              <Input
                label='Confirm Password*'
                type='password'
                name='confirmPassword'
                placeholder='Enter your password'
                required
                isValid={isSignUpValid}
                onChange={handleInputChange}
              />
              <div className={`message${!isSignUpValid ? ' mandatory' : ''}`}>
                {signUpFormErrorMessage.confirmPassword}
              </div>
            </div>
          </div>
          <Input
            label='Skills'
            type='text'
            name='skills'
            placeholder='Enter comma separated skills'
            isValid={isSignUpValid}
            style={{ marginTop: '25px' }}
            onChange={handleInputChange}
          />
          <div className={`message${!isSignUpValid ? ' mandatory' : ''}`}>
            {message}
          </div>
          <div className='signup_button'>
            <Button primary type='submit'>
              Signup
            </Button>
          </div>
        </form>
        <div className='footer'>
          Have an account?{' '}
          <span className='footer_text' onClick={handleLogin}>
            Login{' '}
          </span>
        </div>
      </div>
      <Toast ref={toastRef} />
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBodyHeight: (height) => dispatch(setBodyHeight(height)),
});

export default connect(null, mapDispatchToProps)(SignUpPage);
