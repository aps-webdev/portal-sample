import React from 'react';
import PropTypes from 'prop-types';
import './NoData.styles.scss';

import Button from '../Button/Button.index';
import Icon from '../../assets/no_application.png'

function NoData({ btnLabel, icon, info, onClick, ...otherProps }) {
  return (
    <React.Fragment>
      <div className='nodata'>
        <img src={icon} alt='' className='nodata_image' />
        <p className='nodata_info'>{info}</p>
        {btnLabel ? <Button primary onClick={onClick}>{btnLabel}</Button> : null}
      </div>
    </React.Fragment>
  );
}

NoData.defaultProps = {
  icon: Icon
}
NoData.propTypes = {
  infor: PropTypes.string,
  btnLabel: PropTypes.string
};

export default NoData;
