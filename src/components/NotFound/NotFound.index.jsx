import React from 'react';

import './NotFound.styles.scss';
import NotFound from '../../assets/Scarecrow.png';
import Button from '../Button/Button.index';

function PageNotFound(props) {
  return (
    <section className='notFound'>
      <header className='notFound_head'>404 not found</header>
      <div className='notFound_body'>
        <picture className='notFound_body_image'>
          <img src={NotFound} alt='Not Found' />
        </picture>
        <article className='notFound_body_details'>
          <div className='notFound_body_title'>I have bad news for you</div>
          <div className='notFound_body_description'>
            The page you are looking for might be removed or is temporarily
            unavailable, click hompage button below to go back.
          </div>
          <Button primary onClick={props.handleHomePageClick}>
            Homepage
          </Button>
        </article>
      </div>
    </section>
  );
}

export default PageNotFound;
