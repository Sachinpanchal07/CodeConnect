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

  // handle logout
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="fixed w-full left-0 top-0 z-100">
      <div className="h-16 navbar bg-gray-900  text-white shadow-md">
        <div className="flex flex-1 items-center h-16 gap-3">
          <Link
            to="/feed"
            className="text-[1.2rem] sm:text-xl  md:text-2xl font-bold pl-2 sm:pl-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            CodeConnect
          </Link>
        </div>

        {user ? (
          <div className="flex gap-2 pr-2 sm:pr-4">
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
                      <Link to="/feed">Home</Link>
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
                {!user.isPremium && (
                  <div className="px-5 py-2 cursor-pointer mx-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:from-yellow-600 hover:via-orange-600 hover:to-amber-700 transition duration-300">
                    <Link to="/premium">Premium</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="mr-2 font-semibold border text-sm text-blue-600 rounded-sm py-1 px-4 transition-transform hover:scale-105 ease-in-out duration-300 hover:bg-none ">login</Link>
            <Link to="/login" className="mr-4 font-semibold text-sm white bg-blue-700 rounded-sm py-1 px-4 transition-transform hover:scale-105 ease-in-out duration-300 hover:bg-none ">signup</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
