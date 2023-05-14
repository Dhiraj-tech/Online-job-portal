import { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import http from "../http";
import { Loading } from "./Loading";

export const JobList = ({ uri, title }) => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setLoading(true);
    http.get(uri)
      .then(({ data }) => setJobs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
              [...jobs]
                .splice(0, 4)
                .map((job) => <JobCard key={job._id} job={job} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
