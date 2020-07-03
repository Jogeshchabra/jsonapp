import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "../styles/Home.css";

const Home = (props) => {
  const history = useHistory();

  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [originalUsers, setOriginalUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      setOriginalUsers(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    if (!users.length) fetchUsers();
  }, []);

  const searchUsers = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearch(searchValue);
    if (searchValue.length > 0) {
      const filteredUsers = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchValue) ||
          user.email.toLowerCase().includes(searchValue) ||
          user.username.toLowerCase().includes(searchValue)
        );
      });
      if (!filteredUsers.length) setError("No Users Founds");
      setUsers(filteredUsers);
    } else {
      setError("");
      setUsers(originalUsers);
    }
  };

  return (
    <div>
      <span className="input">
        <p>Seach Users</p>
        <input type="text" value={search} onChange={searchUsers} />
      </span>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li
            className="home-list"
            onClick={() => history.push(`/posts/${user.id}`)}
          >
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
