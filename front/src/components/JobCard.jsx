import { Link } from "react-router-dom";
import { imgUrl } from "../lib";
import moment from "moment";

export const JobCard = ({ job }) => {
  return (
    <div className="job-box card mt-4 mx-auto">
      <div className="p-4">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img src={imgUrl(job.images[0])} className="img-fluid" />
          </div>
          <div className="col-md-3">
            <div className="mb-2 mb-md-0" id="job-tile">
              <h5 className="fs-18 mb-0">
                <Link className="text-dark">{job.title}</Link>
              </h5>
              <p className="text-muted fs-14 mb-0">IT solutions Pvt.Ltd</p>
            </div>
          </div>
          <div className="col-md-3" id="job-tiless">
            <div className="d-flex mb-2">
              <div className="flex-shrink-0">
                <i className="mdi mdi-map-marker text-primary me-1"></i>
              </div>
              <p className="text-muted mb-0">
                <i className="fa-solid fa-location-dot me-2"></i>
                {job.location}
              </p>
            </div>
          </div>
          <div className="col-md-2" id="job-tiless">
            <div className="d-flex mb-0">
              <div className="flex-shrink-0">
                <i className="fas fa-clock me-2"></i>
                {moment(job.createdAt).fromNow()}
              </div>
            </div>
          </div>
          <div className="col-md-2" id="job-tiless">
            <div>
              <span
                className="badge bg-success-subtle text-success fs-13 mt-1"
                id="fulltime"
              >
                Full Time
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 bg-light">
        <div className="row justify-content-between">
          <div className="col-md-4">
            <div>
              <p className="text-muted mb-0">
                <span className="text-dark">Experience :</span> {job.experience}
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-3">
            <div>
              <Link to={`/job/${job._id}`}>View details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
