import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../Component/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/blog/all-blog"
      );
      setBlogs(response.data.blog);
      console.log(response.data.blog);
      blogs.map((blog) =>
        console.log(localStorage.getItem("userId") === blog.user)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard
          id={blog["_id"]}
          isUser={localStorage.getItem("userId") === blog.user}
          username={blog.username}
          title={blog.title}
          description={blog.description}
          createdAt={
            blog.createdAt.split("T")[0] + " At " + blog.createdAt.split("T")[1]
          }
        />
      ))}
    </div>
  );
};

export default Blogs;
