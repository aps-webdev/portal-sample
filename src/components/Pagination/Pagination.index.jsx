import React from 'react';

import './Pagination.styles.scss';
import Next from '../../assets/next-arrow.png';
import Prev from '../../assets/prev-arrow.png';

function Pagination({
  limit,
  maxCount,
  pageNumber,
  goToNextPage,
  goToPreviousPage,
  ...restProps
}) {
  React.useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  });

  return (
    <div className='paginationContainer' {...restProps}>
      <div className='pagination'>
        <button
          className='pagination_prevBtn'
          onClick={goToPreviousPage}
          disabled={pageNumber === 1 ? true : ''}
        >
          <img src={Prev} alt='prev' className='pagination_prevBtn_icon' />
        </button>

        <div className='pagination_pagenumber'>
          <span>{pageNumber}</span>
        </div>

        <button
          className='pagination_nextBtn'
          onClick={goToNextPage}
          disabled={pageNumber * limit >= maxCount ? true : ''}
        >
          <img src={Next} alt='next' className='pagination_nextBtn_icon' />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
