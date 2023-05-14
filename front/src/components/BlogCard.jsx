import { useEffect, useState } from "react";
import http from "../http";
import { dtFormat, imgUrl } from "../lib";

export const BlogCard = ({ blog }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const loadData = () =>
    http
      .get("blogs")
      .then(({ data }) => setBlogs(data))
      .catch(() => {})
      .finally(() => setLoading(false));

  return (
    <>
      <div className="container">
        <div className="row mt-4">
            <div className="col-lg-12">
          <div className="col-lg-6 mx-auto" id="blogcon">
            <article className="post position-relative mt-4">
              <div className="post-preview overflow-hidden mb-3 rounded-3">
                <a>
                  <img src={imgUrl(blog.images[0])} className="img-fluid" />
                </a>
              </div>
              <p className="text-muted mb-2">{dtFormat(blog.createdAt)}</p>
              <h5 className="mb-3">
                <a className="primary-link">
                  {blog.title}
                </a>
              </h5>
              <p
                className="text-muted"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></p>
            </article>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
