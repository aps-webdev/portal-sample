import React, { useEffect, useRef } from 'react';
import './HomePage.styles.scss';

import NoJobs from '../../assets/no_data.png';
import Modal from '../../components/Modal/Modal.index';
import Cards from '../../components/Cards/Cards.index';
import NoData from '../../components/NoData/NoData.index';

import { useRecruiterController } from './useRecruiterController';
import { connect } from 'react-redux';
import { setBodyHeight } from '../../redux/auth/auth.action';
import Pagination from '../../components/Pagination/Pagination.index';

function RecruitHomePage(props) {
  const {
    isModalOpen,
    handlePostJob,
    toggleModal,
    postedJobs,
    metaData,
    pageNumber,
    goToNextPage,
    goToPreviousPage,
    jobApplicants,
  } = useRecruiterController(props);

  const bodyRef = useRef(null);

  useEffect(() => {
    props.setBodyHeight(bodyRef.current.clientHeight);
  });

  let bottomPlacement =
    bodyRef.current &&
    Math.max(bodyRef.current.clientHeight, window.innerHeight);

  return (
    <React.Fragment>
      <div className='recruiterPage' ref={bodyRef}>
        <div className='recruiterPage_title'>Jobs posted by you</div>
        {postedJobs.length ? (
          <div className='recruiterPage_postedJob'>
            {postedJobs.map((job, idx) => {
              return (
                <Cards.ActionCard
                  key={idx}
                  title={job.title}
                  text={job.description}
                  location={job.location}
                  btnLabel='View applications'
                  style={{ margin: '20px 0 0' }}
                  onClick={() => toggleModal(job.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className='recruiterPage_nodataContainer'>
            <NoData
              icon={NoJobs}
              info='Your posted jobs will show here!'
              btnLabel='Post a Job'
              onClick={handlePostJob}
            />
          </div>
        )}
        {postedJobs.length ? (
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
          text='Applicants for this job'
          description={
            jobApplicants.length > 0
              ? `Total ${jobApplicants.length} applications`
              : `0 applications`
          }
          onClose={toggleModal}
        >
          {!jobApplicants.length ? (
            <div className='modalNoDataChild'>
              <NoData info='No applications available!' />
            </div>
          ) : (
            <div className='modalDataChild'>
              {jobApplicants.map((applicant, idx) => {
                return (
                  <Cards.AvatarCard
                    key={idx}
                    name={applicant.name}
                    email={applicant.email}
                    skills={applicant.skills}
                    style={{ marginBottom: '30px' }}
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

export default connect(null, mapDispatchToProps)(RecruitHomePage);
