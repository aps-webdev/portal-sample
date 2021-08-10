import React from 'react';

import './Loader.styles.scss';
import Backdrop from '../Backdrop/Backdrop.index';

function Loader() {
  return (
    <React.Fragment>
      <div className='Loader-wrap'>
        <div className='donutSpinner' />
      </div>
      <Backdrop />
    </React.Fragment>
  );
}

export default Loader;
