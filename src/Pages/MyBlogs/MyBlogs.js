import React, { useEffect, useState } from "react";
import axios from "axios";
import blogcss from "./myblog.css";
import BlogCard from "../../Component/BlogCard";

const MyBlogs = () => {
  const [myblog, setMyBlog] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/blog/user-blog/${id}`
        );
        console.log(response.data.userBlog.blog);
        setMyBlog(response.data.userBlog.blog);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="myblg">
      {myblog.map((blog) => {
        return (
          <BlogCard
            id={blog["_id"]}
            isUser={true}
            username={blog.username}
            title={blog.title}
            description={blog.description}
            createdAt={
              blog.createdAt.split("T")[0] +
              " At " +
              blog.createdAt.split("T")[1]
            }
          />
        );
      })}
    </div>
  );
};

export default MyBlogs;
