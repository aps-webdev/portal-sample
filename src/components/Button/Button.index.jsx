import React from 'react';
import PropTypes from 'prop-types';
import './Button.styles.scss';

function Button({ children, primary, secondary, action, icon, ...restProps }) {
  const buttonClasses = ['button'];
  if (primary) buttonClasses.push('primary');
  else if (secondary) buttonClasses.push('secondary');
  else if (action) buttonClasses.push('action')
  return (
    <React.Fragment>
      <button className={buttonClasses.join(' ')} {...restProps}>
        {icon ? (
          <img
            src={icon}
            alt='icon'
            className={`button_icon${primary ? ' primaryColor' : ''}`}
          />
        ) : (
          ''
        )}
        <div>{children}</div>
      </button>
    </React.Fragment>
  );
}

Button.defaultProps = {
  children: 'Label',
  primary: false,
  secondary: false,
};

Button.propTypes = {
  children: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default Button;
