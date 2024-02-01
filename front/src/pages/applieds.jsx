import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setInState } from "../lib";
import http from "../http";

export const Applieds = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (ev) => {
    setForm({
      ...form,
      files: ev.target.files,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);

    let fd = new FormData();
    for (let k in form) {
      if (k == "files") {
        for (let file of form.files) {
          fd.append(`files`, file);
        }
      } else {
        fd.append(k, form[k]);
      }
    }

    http.post("applieds", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate(`https://online-job-portal-cwo9.onrender.com/jobs/${id}`);
      })
      .catch((err) =>{})
      .finally(() => setLoading(false));
  };

  return (
    <Row>
      <Col xs="12">
        <Row>
          <Col sm="4" className="mx-auto" id="applycontent">
          {loadingPage ? <Loading /> :<Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  onChange={(ev) => setInState(ev, form, setForm)}
                  required
                />
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="email">Email Address</Form.Label>
                <Form.Control
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(ev) => setInState(ev, form, setForm)}
                  required
                />
              </div>

              <div className="mb-3">
                <Form.Label htmlFor="message">Message</Form.Label>
                <textarea
                  className="form-control"
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  onChange={(ev) => setInState(ev, form, setForm)}
                  required
                />
              </div>

              <div className="mb-3">
                <Form.Label htmlFor="files">Resume Upload</Form.Label>
                <Form.Control
                  type="file"
                  name="files"
                  id="files"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                  multiple
                />
              </div>

              <button loading={loading} type="submit" className="btn btn-primary w-100">
                Send Application
              </button>
            </Form>}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
