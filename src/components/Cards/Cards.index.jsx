import React from 'react';
import './Cards.styles.scss';

import LocationDrop from '../../assets/location.png';
import Button from '../Button/Button.index';

function InfoCard({ title, text, ...otherProps }) {
  return (
    <React.Fragment>
      <div className='infoCard' {...otherProps}>
        <div className='infoCard_head'>{title}</div>
        <div className='infoCard_body'>{text}</div>
      </div>
    </React.Fragment>
  );
}

function ActionCard({
  title,
  text,
  location,
  btnLabel,
  onClick,
  onCardClick,
  message,
  ...restProps
}) {
  return (
    <React.Fragment>
      <div
        className={`actionCard${onCardClick ? ' clikableCard' : ''}`}
        {...restProps}
        onClick={onCardClick}
      >
        <div className='actionCard_head'>{title}</div>
        <div className='actionCard_body'>{text}</div>
        <div className='actionCard_footer'>
          <div className='actionCard_footer_location'>
            <img src={LocationDrop} alt='location' />
            <div className='actionCard_footer_location_name'>{location}</div>
          </div>
          <div className='actionCard_footer_button'>
            <Button action onClick={onClick}>
              {btnLabel}
            </Button>
            <div className='actionCard_footer_message'>{message}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function AvatarCard({ name, email, skills,noSkills, ...restProps }) {
  return (
    <React.Fragment>
      <div className='avatarCard' {...restProps}>
        <div className='avatarCard_head'>
          <div className='avatarCard_head_avatar'>
            {name.charAt(0).toUpperCase()}
          </div>
          <div className='details'>
            <div className='details_name'>{name}</div>
            <div className='details_email'>{email}</div>
          </div>
        </div>
        <div className='avatarCard_body'>
          <p className='avatarCard_body_title'>{noSkills ? null :'Skills'}</p>
          <div className='avatarCard_body_description'>{skills}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

InfoCard.defaultProps = {
  title: 'Title goes here',
  text: 'Info text goes here',
};

ActionCard.defaultProps = {
  title: 'Title goes here',
  text: 'Info text goes here',
  location: 'Location',
  btnLabel: 'Label',
};

AvatarCard.defaultProps = {
  name: 'Applicant Name',
  email: 'Applicant Email',
  skills: 'Skills goes here',
};

const Cards = { InfoCard, ActionCard, AvatarCard };

export default Cards;
