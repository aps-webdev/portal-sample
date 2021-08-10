import React, { useEffect, useRef } from 'react';
import './ForgotPassword.styles.scss';
import Input from '../../components/Input/Input.index';
import Button from '../../components/Button/Button.index';
import { useForgotPasswordController } from './useForgotPasswordController';
import { Toast } from '../../components/Toast/Toast.index';
import { connect } from 'react-redux';
import { setBodyHeight } from '../../redux/auth/auth.action';

function ForgotPasswordPage(props) {
  const {
    resetPassword,
    handleSubmit,
    formRef,
    isInputValid,
    message,
    handleInputChange,
    toastRef,
  } = useForgotPasswordController(props);

  const bodyRef = useRef(null);

  useEffect(() => {
    props.setBodyHeight(bodyRef.current.clientHeight);
  }, [props]);

  return (
    <React.Fragment>
      <div className='forgotPassword' ref={bodyRef}>
        <div className='title'>
          {!resetPassword ? `Forgot your password?` : 'Reset Your Password'}
        </div>
        <div className='infomessage'>
          {!resetPassword
            ? `Enter the email associated with your account and we’ll send you
          instructions to reset your password.`
            : 'Enter your new password below.'}
        </div>
        <form noValidate onSubmit={handleSubmit} ref={formRef}>
          {!resetPassword ? (
            <Input
              label='Email address'
              type='text'
              name='email'
              placeholder='Enter your email'
              required
              isValid={isInputValid}
              onChange={handleInputChange}
              style={{ marginTop: '20px' }}
            />
          ) : (
            <>
              <Input
                label='New password'
                type='password'
                name='password'
                placeholder='Enter your password'
                required
                isValid={isInputValid}
                onChange={handleInputChange}
                style={{ marginTop: '20px' }}
              />
              <Input
                label='Confirm new password'
                type='password'
                name='confirmPassword'
                placeholder='Enter your password'
                required
                isValid={isInputValid}
                onChange={handleInputChange}
                style={{ marginTop: '20px' }}
              />
            </>
          )}
          <div className={`message${!isInputValid ? ' mandatory' : ''}`}>
            {message}
          </div>
          <div className='forgotPassword_button'>
            <Button primary type='submit'>
              {!resetPassword ? 'Submit' : 'Reset'}
            </Button>
          </div>
        </form>
      </div>
      <Toast ref={toastRef} />
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBodyHeight: (height) => dispatch(setBodyHeight(height)),
});

export default connect(null, mapDispatchToProps)(ForgotPasswordPage);
