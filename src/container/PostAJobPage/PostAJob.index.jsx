import React, { useEffect, useRef } from 'react';
import './PostAJob.styles.scss';
import Input from '../../components/Input/Input.index';
import Button from '../../components/Button/Button.index';
import TextArea from '../../components/Input/TextArea.index';
import { usePostController } from './usePostController';
import { Toast } from '../../components/Toast/Toast.index';
import { connect } from 'react-redux';
import { setBodyHeight } from '../../redux/auth/auth.action';

function PostAJob(props) {
  const {
    handleSubmit,
    formRef,
    isPostValid,
    message,
    handleInputChange,
    postingJobErrorMessage,
    toastRef,
  } = usePostController(props);

  const bodyRef = useRef();

  useEffect(() => {
    props.setBodyHeight(bodyRef.current.clientHeight);
  }, [props]);

  return (
    <React.Fragment>
      <div className='jobPost' ref={bodyRef}>
        <div className='title'>Post a Job</div>
        <form noValidate onSubmit={handleSubmit} ref={formRef}>
          <Input
            label='Job title*'
            type='text'
            name='title'
            placeholder='Enter job title'
            isValid={isPostValid}
            onChange={handleInputChange}
            required
          />
          <div className={`message${!isPostValid ? ' mandatory' : ''}`}>
            {postingJobErrorMessage.title}
          </div>
          <TextArea
            label='Description*'
            name='description'
            placeholder='Enter job description'
            rows='5'
            isValid={isPostValid}
            style={{ marginTop: '20px' }}
            onChange={handleInputChange}
            required
          />
          <div className={`message${!isPostValid ? ' mandatory' : ''}`}>
            {postingJobErrorMessage.description}
          </div>
          <Input
            label='Location*'
            type='text'
            name='location'
            placeholder='Enter location'
            isValid={isPostValid}
            onChange={handleInputChange}
            style={{ marginTop: '20px' }}
            required
          />
          <div className={`message${!isPostValid ? ' mandatory' : ''}`}>
            {postingJobErrorMessage.location}
          </div>
          <div className={`message${!isPostValid ? ' mandatory' : ''}`}>
            {message}
          </div>
          <div className='jobPost_button'>
            <Button primary type='submit'>
              Post
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

export default connect(null, mapDispatchToProps)(PostAJob);
