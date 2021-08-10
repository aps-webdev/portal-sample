import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getRequest } from '../../utils/requests/request';

export const useRecruiterController = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState({ page: 1 });
  const [postedJobs, setPostedJobs] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [jobApplicants, setJobApplicants] = useState([]);
  const [jobId, setJobId] = useState();

  const { pathname } = useLocation();
  let history = useHistory();

  useEffect(() => {
    getRequest('recruiters/jobs', { ...pageNumber }).then((response) => {
      if (typeof response.message === 'string') {
        return;
      } else {
        setPostedJobs([...response.data.data]);
        setMetaData(response.data.metadata);
      }
    });
  }, [pageNumber]);

  useEffect(() => {
    if (isModalOpen) {
      getRequest(`recruiters/jobs/${jobId}/candidates`).then((response) => {
        console.log('brrrruuuuuuuuuuuuuu', response);
        if (
          typeof response === 'string' ||
          typeof response.message === 'string'
        ) {
          return;
        } else {
          setJobApplicants([...response.data]);
        }
      });
    }
  }, [isModalOpen]);

  function goToNextPage() {
    setPageNumber((page) => ({
      ...page,
      page: page.page + 1,
    }));
  }

  function goToPreviousPage() {
    setPageNumber((page) => ({
      ...page,
      page: page.page - 1,
    }));
  }

  const handlePostJob = () => {
    history.push(`${pathname}/postjob`);
  };

  const toggleModal = (jobId) => {
    setIsModalOpen((prevState) => !prevState);
    setJobId(jobId);
  };

  return {
    isModalOpen,
    handlePostJob,
    toggleModal,
    postedJobs,
    metaData,
    pageNumber,
    goToNextPage,
    goToPreviousPage,
    jobApplicants,
  };
};
