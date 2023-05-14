import { useEffect, useState } from "react";
import http from "../http";
import { Loading } from "./Loading";
import { BlogCard } from ".";

export const BlogList = ({ uri, title }) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    http.get("blogs")
      .then(({ data }) => setBlogs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 py-3">
        <h4 className="text-center mt-4">Latest & Trending Blog Post</h4>
          <div>
            {loading ? (
              <Loading />
            ) : (
              [...blogs]
                .splice(0, 4)
                .map((blog) => <BlogCard key={blog._id} blog={blog} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
