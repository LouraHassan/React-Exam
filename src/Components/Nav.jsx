import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const usersAPI = `https://67077eaca0e04071d22a9158.mockapi.io/users`;
function Nav() {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState([]);

  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = () => {
    axios.get(usersAPI + `/` + userId).then((res) => {
      setUser(res.data);
    });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/bookList">Books</Link>
            </li>
            <li>
              <Link to={`/favorite/${user.id}`}>Favorites</Link>
            </li>
            <li>
              <Link to={`/readBook/${user.id}`}>Read Books</Link>
                      </li>
                      <li>
              <Link to={`/`} className="text-error">Logout</Link>
            </li>
          </ul>
              </div>
              <p className="text-lg font-bold">Books Library</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/bookList">Books</Link>
            </li>
            <li>
              <Link to={`/favorite/${user.id}`}>Favorites</Link>
            </li>
            <li>
              <Link to={`/readBook/${user.id}`}>Read Books</Link>
            </li>
        </ul>
      </div>
          <div className="navbar-end">
          <Link to={`/`} className="btn btn-outline btn-error hidden lg:flex">Logout</Link>

      </div>
    </div>
  );
}

export default Nav;
