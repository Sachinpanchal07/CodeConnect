import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // handle logout
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-16 navbar bg-neutral-200 dark:bg-neutral-600 shadow-sm">
      <div className="flex flex-1 items-center h-16 gap-3">
        <Link to="/">
          <img
            className="h-12 w-auto cursor-pointer transition-transform duration-200 hover:scale-110 hover:opacity-90 sm:h-10"
            src="appIcon.png"
            alt="app-icon"
          />
        </Link>
        <Link to="/" className="text-2xl font-semibold dark:text-neutral-200">
          CodeConnect
        </Link>
      </div>

      <div>
        <button
          onClick={toggleDarkMode}
          className="bg-amber-600 hover:bg-amber-500 cursor-pointer rounded-full flex justify-center align-middle p-[6px] mr-4"
        >
          <i
            className={`bx bx-${darkMode ? "sun" : "moon"} text-lg lg:text-xl`}
          ></i>
        </button>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="flex flex-row">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ">
                  <img alt="user photo" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow bg-neutral-200 text-neutral-800 dark:bg-neutral-600 dark:text-neutral-200"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/Connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link to="/Search">Search</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
            <div className="px-5 py-2 mx-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:from-yellow-600 hover:via-orange-600 hover:to-amber-700 transition duration-300">
              <Link to="/premium">Upgrade</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
