import React from 'react';
import PropTypes from 'prop-types';

function TextArea({ name, placeholder, label, style, isValid, rows, ...otherProps }) {
  return (
    <React.Fragment>
      <div className='textareagroup' style={style}>
        <label htmlFor={name} className='textareagroup_label'>
          {label}
        </label>
        <textarea
          className={`textareagroup_textbox ${isValid ? '' : 'invalid'}`}
          name={name}
          cols='30'
          rows={rows}
          placeholder={placeholder}
          {...otherProps}
        />
      </div>
    </React.Fragment>
  );
}
TextArea.defaultProps = {
  label: 'Label',
  placeholder: 'Enter your comment here',
};
TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextArea;
