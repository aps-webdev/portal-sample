import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setSessionStorage } from '../../helpers/sessionStorage';
import { postRequest } from '../../utils/requests/request';

export const useLoginController = (props) => {
  const [isLoginValid, setIsLoginValid] = useState(true);
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('All fields are mandatory.');

  const { setUserAuth, setRecruiterLogged, setUserName } = props;

  let history = useHistory();
  const formRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, []);

  const handleInputChange = (e) => {
    setLoginFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current.checkValidity()) {
      postRequest('auth/login', loginFormData).then((response) => {
        if (typeof response === 'string') {
          setMessage(response);
          setIsLoginValid(false);
        } else {
          setUserAuth(true);
          setUserName(response.data.name);
          setSessionStorage('token', response.data.token);
          setSessionStorage('name', response.data.name);
          setSessionStorage('userRole', response.data.userRole);
          if (response.data.userRole) {
            history.push('/candidate');
          } else {
            setRecruiterLogged(true);
            history.push('/recruiter');
          }
        }
      });
    } else {
      setIsLoginValid(false);
    }
  };

  const handleSignup = () => {
    history.push('/signup');
  };

  const handleForgotPassword = () => {
    history.push('/changepassword');
  };

  return {
    isLoginValid,
    message,
    formRef,
    handleSubmit,
    handleSignup,
    handleForgotPassword,
    handleInputChange,
  };
};
