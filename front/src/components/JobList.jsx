import { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import http from "../http";
import { Loading } from "./Loading";

export const JobList = ({ uri, title }) => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const jobsPerPage = 2;

  useEffect(() => {
    setLoading(true);
    http.get(uri)
      .then(({ data }) => setJobs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(
    indexOfFirstJob,
    indexOfLastJob
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
    const handleButtonClick = (index) => {
      setActiveButton(index);
      paginate(index);
    };

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 py-3">
          <div className="row">
            <div className="col-12 text-center text-uppercase">
              <h2>{title}</h2>
            </div>
          </div>
          <div>
            {loading ? (
              <Loading />
            ) : (
              currentJobs
                .map((job) => <JobCard key={job._id} job={job} />)
            )}
          </div>
          <div className="pagination d-flex justify-content-center mt-3">
            {Array.from({
              length: Math.ceil(jobs.length / jobsPerPage),
            }).map((_, index) => (
              <button
              className={`btn ${activeButton === index + 1 ? 'btn-dark' : 'btn-outline-dark'} btnn`}
                type="button"
                key={index}
                onClick={() => handleButtonClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
