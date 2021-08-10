import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './HomePage.styles.scss';

import Cards from '../../components/Cards/Cards.index';

import NoJobs from '../../assets/no_data.png';
import { setBodyHeight } from '../../redux/auth/auth.action';
import { useCandidateController } from './useCandidateController';
import NoData from '../../components/NoData/NoData.index';
import Pagination from '../../components/Pagination/Pagination.index';
import Modal from '../../components/Modal/Modal.index';

function CandidateHomePage(props) {
  const {
    isModalOpen,
    toggleModal,
    availableJobs,
    metaData,
    pageNumber,
    goToNextPage,
    goToPreviousPage,
    jobDetails,
    applyForJob,
    onCardClick,
    alreadyAppliedMessage,
  } = useCandidateController(props);
  const bodyRef = useRef(null);

  useEffect(() => {
    props.setBodyHeight(bodyRef.current.clientHeight);
  });

  let bottomPlacement = bodyRef.current && bodyRef.current.clientHeight;

  return (
    <React.Fragment>
      <div className='candidatePage' ref={bodyRef}>
        <div className='candidatePage_title'>Jobs available for you</div>
        {availableJobs.length ? (
          <div className='candidatePage_availableJob'>
            {availableJobs.map((job, idx) => {
              return (
                <Cards.ActionCard
                  key={idx}
                  title={job.title}
                  text={job.description}
                  location={job.location}
                  btnLabel='Apply'
                  style={{ margin: '20px 0 0' }}
                  onClick={(e) => applyForJob(e, job.id)}
                  onCardClick={() => onCardClick(job.id)}
                  message={alreadyAppliedMessage}
                />
              );
            })}
          </div>
        ) : (
          <div className='recruiterPage_nodataContainer'>
            <NoData icon={NoJobs} info='Available jobs will show here!' />
          </div>
        )}
        {availableJobs.length ? (
          <Pagination
            style={{ top: bottomPlacement }}
            limit={metaData.limit}
            maxCount={metaData.count}
            pageNumber={pageNumber.page}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
          />
        ) : null}
      </div>
      {isModalOpen ? (
        <Modal
          text='Job Details'
          description={
            jobDetails.length > 0
              ? `Details for job id : ${jobDetails[0].id}`
              : `No furthur details`
          }
          onClose={toggleModal}
          minHeight='auto'
        >
          {!jobDetails.length ? (
            <div className='modalNoDataChild'>
              <NoData info='No applications available!' />
            </div>
          ) : (
            <div className='modalDataChild'>
              {jobDetails.map((job, idx) => {
                return (
                  <Cards.AvatarCard
                    key={idx}
                    name={job.title}
                    email={job.description}
                    skills={job.location}
                    style={{ marginBottom: '30px', minWidth: '100%' }}
                    noSkills={true}
                  />
                );
              })}
            </div>
          )}
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBodyHeight: (height) => dispatch(setBodyHeight(height)),
});

export default connect(null, mapDispatchToProps)(CandidateHomePage);
