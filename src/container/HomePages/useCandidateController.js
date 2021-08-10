import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getRequest, postRequest } from '../../utils/requests/request';

export const useCandidateController = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState({ page: 1 });
  const [availableJobs, setAvailableJobs] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [jobDetails, setJobDetails] = useState([]);
  const [appliedJobId, setappliedJobId] = useState('');

  useEffect(() => {
    getRequest('candidates/jobs', { ...pageNumber }).then((response) => {
      setAvailableJobs([...response.data]);
      setMetaData(response.metadata);
    });
  }, [pageNumber]);

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

  const applyForJob = (event, jobId) => {
    event.stopPropagation();
    postRequest('/candidates/jobs', { jobId: jobId }).then((response) => {
      if (typeof response === 'string') {
        return;
      } else {
        setappliedJobId([...appliedJobId, response.data.id]);
      }
    });
  };

  const onCardClick = (jobId) => {
    setIsModalOpen(!isModalOpen);
    getRequest(`jobs/${jobId}`).then((response) => {
      setJobDetails([response.data]);
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    isModalOpen,
    availableJobs,
    metaData,
    pageNumber,
    goToNextPage,
    goToPreviousPage,
    jobDetails,
    applyForJob,
    onCardClick,
    appliedJobId,
    toggleModal,
  };
};
