import { useEffect, useState } from "react";
import http from "../http";
import { useParams } from "react-router-dom";
import { Loading, JobCard } from "../components";
import { empty, imgUrl } from "../lib";
import { useSelector } from "react-redux";
import moment from "moment";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { toast } from "react-toastify";
import { Applieds } from "./applieds";

export const Job = () => {
  const [job, setJob] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [img, setImg] = useState("");
  const [similars, setSimilars] = useState([]);
  const [modal, setModal] = useState(false);

  const user = useSelector((st) => st.user.value);

  const params = useParams();

  useEffect(() => {
    loadData();
  }, [params.id]);

  useEffect(() => {
    if (Object.keys(job).length) {
      http
        .get(`/category/${job.category_id}/jobs`)
        .then(({ data }) => {
          let list = data.filter((pro) => pro._id !== job._id);
          setSimilars(list);
        })
        .catch(() => {});
    }
  }, [job]);

  const loadData = () => {
    setLoadingPage(true);

    http
      .get(`/job/${params.id}`)
      .then(({ data }) => {
        setJob(data);
        setImg(data.images[0].replace(/\\/g, "/"));
      })
      .finally(() => setLoadingPage(false));
  };

  const handlebutton = () => {
    toast.info("Please login to apply the job");
  };

  return loadingPage ? (
    <Loading />
  ) : (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8" id="col-img">
            <div className="card job-detail overflow-hidden" id="col-img">
              <div>
                {job.images.map((image, i) => (
                  <div className="col-sm-2 col-3" key={i}>
                    <img src={imgUrl(job.images[0])} className="img-detail" alt={`Job ${i}`} />
                  </div>
                ))}
              </div>
              <div className="card-body p-4">
                <div>
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="mb-1">{job.title}</h5>
                      <ul className="list-inline text-muted mb-0"></ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                   <div className="row g-2">
                     <div className="col-lg-3">
                       <div className="border rounded-start p-3">
                         <p className="text-muted mb-0 fs-13">Experience</p>
                         <p className="fw-medium fs-15 mb-0">{job.experience}</p>
                       </div>
                     </div>
                     <div className="col-lg-3">
                       <div className="border p-3">
                         <p className="text-muted fs-13 mb-0">Employee type</p>
                         <p className="fw-medium mb-0">Full Time</p>
                       </div>
                     </div>
                     <div className="col-lg-3">
                       <div className="border p-3">
                         <p className="text-muted fs-13 mb-0">Position</p>
                         <p className="fw-medium mb-0">Senior</p>
                       </div>
                     </div>
                     <div className="col-lg-3">
                       <div className="border rounded-end p-3">
                         <p className="text-muted fs-13 mb-0">Offer Salary</p>
                         <p className="fw-medium mb-0">{job.offersalary}</p>
                       </div>
                     </div>
                   </div>
                 </div>

                <div className="mt-4">
                  <h5 className="mb-3">Job Description</h5>
                  <div className="job-detail-desc">
                    <div
                      className="col-12"
                      id="details"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="side-bar ms-lg-4">
              <div className="card job-overview" id="job-overview">
                <div className="card-body p-4">
                  <h6 className="fs-17">Job Overview</h6>
                  <ul className="list-unstyled mt-4 mb-0">
                     <li>
                       <div className="d-flex mt-4">
                         <i
                           className="fa-solid fa-user bg-primary-subtle text-primary"
                           id="icon"
                         ></i>
                         <div className="ms-3">
                           <h6 className="fs-14 mb-2">Job Title</h6>
                           <p className="text-muted mb-0">{job.title}</p>
                         </div>
                       </div>
                     </li>
                     <li>
                       <div className="d-flex mt-4">
                         <i
                           className="fa-solid fa-star bg-primary-subtle text-primary"
                           id="icon"
                         ></i>
                         <div className="ms-3">
                           <h6 className="fs-14 mb-2">Experience</h6>
                           <p className="text-muted mb-0">{job.experience}</p>
                         </div>
                       </div>
                     </li>
                     <li>
                       <div className="d-flex mt-4">
                         <i
                           className="fa-solid fa-location-dot bg-primary-subtle text-primary"
                           id="icon"
                         ></i>
                         <div className="ms-3">
                           <h6 className="fs-14 mb-2">Location</h6>
                           <p className="text-muted mb-0">{job.location}</p>
                         </div>
                       </div>
                     </li>
                     <li>
                       <div className="d-flex mt-4">
                         <i
                           className="fa-solid fa-money-bill bg-primary-subtle text-primary"
                           id="icon"
                         ></i>
                         <div className="ms-3">
                           <h6 className="fs-14 mb-2">Offered Salary</h6>
                           <p className="text-muted mb-0">{job.offersalary}</p>
                         </div>
                       </div>
                     </li>
                     <li>
                       <div className="d-flex mt-4">
                         <i
                           className="fa-solid fa-graduation-cap bg-primary-subtle text-primary"
                           id="icon"
                         ></i>
                         <div className="ms-3">
                           <h6 className="fs-14 mb-2">Qualification</h6>
                           <p className="text-muted mb-0">{job.qualification}</p>
                         </div>
                       </div>
                     </li>

                     <li>
                       <div className="d-flex mt-4">
                         <i
                           className="fas fa-clock bg-primary-subtle text-primary"
                           id="icon"
                         ></i>
                         <div className="ms-3">
                           <h6 className="fs-14 mb-2">Date Posted</h6>
                           {moment(job.createdAt).fromNow()}
                         </div>
                       </div>
                     </li>
                   </ul>
                  <div className="mt-3">
                    <Modal
                      size="md"
                      isOpen={modal}
                      toggle={() => setModal(!modal)}
                    >
                      <ModalHeader toggle={() => setModal(!modal)}>
                        Apply for the job
                      </ModalHeader>
                      <ModalBody>
                        <Applieds />
                      </ModalBody>
                    </Modal>

                    {!empty(user) ? (
                      <button
                        onClick={() => setModal(true)}
                        className="btn btn-primary btn-hover w-100 mt-2"
                      >
                        Apply Now
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-hover w-100 mt-2"
                        onClick={handlebutton}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        {similars.length ? (
          <div className="col-12">
            <div className="row">
              <div className="col-12 py-3">
                <div className="row">
                  <div className="col-12 text-center text-uppercase">
                    <h2 className="text-center">Similar Jobs</h2>
                  </div>
                </div>
                <div className="row row-cols-lg-4 row-cols-sm-2">
                  {similars.map((similar) => (
                    <JobCard job={similar} key={similar._id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

