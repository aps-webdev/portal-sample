import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from '../../helpers/sessionStorage';
import { getRequest, postRequest } from '../../utils/requests/request';

export const useForgotPasswordController = () => {
  const [isInputValid, setIsInputValid] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState({});
  const [resetPasswordDetails, setresetPasswordDetails] = useState({});
  const [message, setMessage] = useState('This field is mandatory.');

  const formRef = useRef(null);
  const toastRef = useRef();
  const history = useHistory();

  const handleInputChange = (e) => {
    if (e.target.name === 'email') {
      setResetPasswordEmail((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setresetPasswordDetails((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current.checkValidity()) {
      if (e.target[0].name === 'password') {
        setMessage('All fields are mandatory.');
      } else {
        setMessage('This field is mandatory.');
      }
      setIsInputValid(false);
    } else {
      if (e.target[0].name === 'password') {
        let token = getSessionStorage('resetPasswordToken');
        postRequest('/auth/resetpassword', {
          ...resetPasswordDetails,
          token,
        }).then((response) => {
          if (typeof response === 'string') {
            setMessage(response);
            setIsInputValid(false);
          } else {
            setTimeout(() => history.push('/login'), 3000);
            toastRef.current.openToast(
              'Password changes',
              ' "Password updated successfully"'
            );
            removeSessionStorage('resetPasswordToken');
          }
        });
      } else {
        getRequest('/auth/resetpassword', resetPasswordEmail).then(
          (response) => {
            if (typeof response === 'string') {
              setMessage(response);
              setIsInputValid(false);
            } else {
              setResetPassword(true);
              setSessionStorage('resetPasswordToken', response.data.token);
              setIsInputValid(true);
            }
          }
        );
      }
    }
  };
  return {
    isInputValid,
    resetPassword,
    message,
    formRef,
    handleSubmit,
    handleInputChange,
    toastRef,
  };
};
