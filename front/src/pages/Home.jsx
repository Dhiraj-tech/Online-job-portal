import { JobList } from "../components/JobList";

export const Home = () => {
  return (
    <>
      <section className="bg-home2" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="mb-4 pb-3 me-lg-5">
                <h6 className="sub-title mt-5">We have 150,000+ live jobs</h6>
                <h1 className="display-5 fw-semibold mb-3">
                  Find your dream jobs with{" "}
                  <span className="text-primary fw-bold">NepalJobHub</span>
                </h1>
                <p className="lead text-muted mb-0">
                  Find jobs, create trackable uploads and enrich your
                  applications. Carefully crafted after analyzing the needs of
                  different industries.
                </p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="mt-5 mt-md-0">
                <img src="process-02.png" alt="" className="img-fluid home-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-4" id="latestjob">
        <main className="row">
          <div className="col-12">
            <JobList title="Latest Job Vacancies" uri="/job/latest" />
          </div>
        </main>
      </div>
    </>
  );
};
