import React, { PureComponent } from 'react';
import './Toast.styles.scss';
import Close from '../../assets/close.png';

export class Toast extends PureComponent {
  state = {
    message: 'You have successfully logged out.',
    title: 'Logout',
    isActive: false,
  };

  openToast = (title = 'Problem Occured', message = 'Error') => {
    this.setState({ message: message, title: title });
    this.setState({ isActive: true }, () => {
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 3000);
    });
  };

  closeToast = () => {
    this.setState({ isActive: false });
  };

  render() {
    const { isActive } = this.state;
    return (
      <div className={`toast${isActive ? ' show' : ''}`}>
        <img
          src={Close}
          alt='close'
          className='toast_close'
          onClick={this.closeToast}
        />
        <div className='toast_title'>{this.state.title}</div>
        <div className='toast_message'>{this.state.message}</div>
      </div>
    );
  }
}
