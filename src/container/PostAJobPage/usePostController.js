import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { postRequest } from '../../utils/requests/request';
export const usePostController = () => {
  const [isPostValid, setIsPostValid] = useState(true);
  const [message, setMessage] = useState('All fields are mandatory.');
  const [jobDetails, setJobDetails] = useState({});
  const [postingJobErrorMessage, setPostingJobErrorMessage] = useState({});

  const formRef = useRef(null);
  const toastRef = useRef(null);
  const history = useHistory();

  const handleInputChange = (e) => {
    setJobDetails((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostingJobErrorMessage({
      title: '',
      description: '',
      location: '',
    });
    if (formRef.current.checkValidity()) {
      postRequest('jobs/', jobDetails).then((response) => {
        if (Array.isArray(response)) {
          setMessage('');
          response.forEach((error, idx) => {
            for (const property in error) {
              setPostingJobErrorMessage((prevState) => {
                return {
                  ...prevState,
                  [property]: error[property],
                };
              });
            }
          });
        } else if (typeof response === 'string') {
          setMessage(response);
          setIsPostValid(false);
        } else {
          setIsPostValid(true);
          setTimeout(() => history.push('/recruiter'), 3000);
          toastRef.current.openToast(
            'Job posted',
            'We ensure you a good employee soon'
          );
        }
      });
    } else {
      setIsPostValid(false);
    }
  };
  return {
    isPostValid,
    message,
    handleSubmit,
    formRef,
    handleInputChange,
    postingJobErrorMessage,
    toastRef,
  };
};
