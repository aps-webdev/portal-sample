import React from 'react';
import './Logo.index.scss';

const Logo = ({ size, ...restProps }) => {
  let logoClasses = ['logo'];
  switch (size) {
    case 'small':
      logoClasses.push('small');
      break;
    case 'large':
      logoClasses.push('large');
      break;
    default:
      break;
  }
  return (
    <React.Fragment>
      <p className={logoClasses.join(' ')} {...restProps}>
        My<span className='logo_job'>Jobs</span>
      </p>
    </React.Fragment>
  );
};

export default Logo;
