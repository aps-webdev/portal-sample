import React from 'react';
import PropTypes from 'prop-types';
import './Input.styles.scss';

function Input({ type, name, label, style, isValid, ...restProps }) {
  return (
    <React.Fragment>
      <div className='inputGroup' style={style}>
        <label htmlFor={name} className='inputGroup_label'>
          {label}
        </label>
        <input
          className={`inputGroup_inputbox ${isValid ? '' : 'invalid'}`}
          type={type}
          id={name}
          name={name}
          {...restProps}
        />
      </div>
    </React.Fragment>
  );
}

Input.defaultProps = {
  type: 'text',
  label: 'Input Text',
  isValid: true,
};

Input.propTypes = {
  type: PropTypes.string,
  isValid: PropTypes.bool,
};

export default Input;
