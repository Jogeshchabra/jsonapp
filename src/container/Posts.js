import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/Posts.css";

const Posts = (props) => {
  const { id } = useParams();

  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState("");

  console.log(posts, id);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?userId=" + id
      );
      setPosts(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    if (!posts.length) fetchPosts();
  }, []);

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <ul>
        {posts.map((post) => (
          <li className="list">
            <p>ID: {post.id}</p>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
