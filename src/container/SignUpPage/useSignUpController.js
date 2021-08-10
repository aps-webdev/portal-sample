import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { postRequest } from '../../utils/requests/request';

export const useSignUpController = () => {
  const [isSignUpValid, setIsSignUpValid] = useState(true);
  const [isRecuiterActive, setIsRecuiterActive] = useState(true);
  const [isCandidateActive, setIsCandidateActive] = useState(false);
  const [signUpFormData, setSignUpFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: 'No skills added',
    userRole: 0,
  });
  const [message, setMessage] = useState('All field are mandatory.');
  const [signUpFormErrorMessage, setSignUpFormErrorMessage] = useState({});

  let history = useHistory();
  const formRef = useRef(null);
  const toastRef = useRef(null);

  const handleInputChange = (e) => {
    setSignUpFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignUpFormErrorMessage({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      skills: '',
    });
    if (formRef.current.checkValidity()) {
      let userRole = isRecuiterActive ? 0 : 1;
      postRequest('auth/register', { ...signUpFormData, userRole }).then(
        (response) => {
          if (Array.isArray(response)) {
            setIsSignUpValid(false);
            setMessage('');
            response.forEach((error, idx) => {
              for (const property in error) {
                setSignUpFormErrorMessage((prevState) => {
                  return {
                    ...prevState,
                    [property]: error[property],
                  };
                });
              }
            });
          } else if (typeof response === 'string') {
            setMessage(response);
            setIsSignUpValid(false);
          } else {
            setTimeout(handleLogin, 3000);
            setIsSignUpValid(true);
            toastRef.current.openToast(
              'Registered',
              'Please login to continue'
            );
          }
        }
      );
    } else {
      setMessage('All fields are mandatory.');
      setIsSignUpValid(false);
      setSignUpFormErrorMessage({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        skills: '',
      });
    }
  };

  const toggleSignUpForm = () => {
    setIsRecuiterActive(!isRecuiterActive);
    setIsCandidateActive(!isCandidateActive);
  };

  const handleLogin = () => {
    history.push('/login');
  };

  return {
    isSignUpValid,
    isRecuiterActive,
    isCandidateActive,
    message,
    formRef,
    handleSubmit,
    toggleSignUpForm,
    handleInputChange,
    handleLogin,
    signUpFormErrorMessage,
    toastRef,
  };
};
