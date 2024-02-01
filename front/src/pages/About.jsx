import { Link } from "react-router-dom";

export const About = () => {
  return (
    <section className="section overflow-hidden">
      <div className="container">
        <div className="row align-items-center g-0" id="about-box">
          <div className="col-lg-6">
            <div className="section-title me-lg-5">
              <h6 className="sub-title">About Us</h6>
              <h2 className="title mb-4">
                Why <span className="text-warning fw-bold">35,000+</span> People Trust On NepalJobHub?
              </h2>

              <p className="text-muted">
                Start working with NepalJobHub that can provide everything you need to generate awareness, drive traffic,
                connect. Dummy text is text that is used in the publishing industry or by web designers to occupy the space
                which will later be filled with 'real' content.
              </p>

              <div className="row mt-4 pt-2">
                <div className="col-md-6">
                  <ul className="list-unstyled about-list text-muted mb-0 mb-md-3">
                    <li> Digital Marketing Solutions</li>
                    <li> Our Talented & Experienced Marketing Agency</li>
                    <li> Creative Design</li>
                    <li> New jobs Innovation</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled about-list text-muted">
                    <li> Create Resume</li>
                    <li> 5000+ Companies</li>
                    <li> Our Blog</li>
                    <li> and more...</li>
                  </ul>
                </div>
              </div>
              <div className="mt-1 mb-4">
                <Link to="#" className="btn btn-primary btn-hover">
                  Learn More <i className="uil uil-angle-right-b align-middle"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-10 mx-auto mt-2 mb-2">
            <div>
                <img src="img-01.jpg" className="img-fluid rounded" />
            </div>
            </div>

        </div>
      </div>
    </section>
  );
};
