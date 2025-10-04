import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addSearchUser } from "../utils/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchUserCard from "./SearchUserCard.jsx";
import { BeatLoader } from "react-spinners";

const SearchUsers = () => {
  const [searchedSkill, setsearchedSkill] = useState("");
  const [loading, setLoading] = useState(false);

  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((store) => store.searchUser);

  const getUsers = async () => {
    try {
      setLoading(true);
      const cookie = document.cookie;
      if (cookie) {
        // check cookie

        if (searchedSkill == "") {
          toast.error("Please enter a valid skill !!");
          dispatch(addSearchUser([]));
          return;
        }
        const res = await axios.post(
          BASE_URL + "/user/search",
          { searchedSkill },
          { withCredentials: true }
        );
        const data = res?.data?.data;

        if (data.length >= 0) {
          dispatch(addSearchUser(data));
        }
        if (data.length == 0) {
          toast.error("Match not found");
        }
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex pt-20 text-gray-200 flex-col px-4 items-center">
      <h2 className="mt-5 text-md sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Find your coding-buddy by entering skill
      </h2>
      <div className="flex justify-between items-center py-8">
        <input
          value={searchedSkill}
          onChange={(e) => setsearchedSkill(e.target.value)}
          id="search"
          placeholder="Enter skill"
          className="h-8 max-w-md px-5 py-2 text-center mx-2 rounded-3xl"
        ></input>
        <div className="">
          <button
            onClick={getUsers}
            className="text-2xl px-1 text-white cursor-pointer transition-transform hover:scale-120 hover:text-gray-300"
          >
            <i className="bx bx-search"></i>
          </button>
        </div>
      </div>

      {loading ? (
        <BeatLoader className="min-h-screen pt-50 text-center" />
      ) : (
        <div className="min-h-screen">
          <div className="min-h-[500px] flex flex-col w-sm sm:w-2xl bg-gray-800 mx-auto sm:rounded-md p-1">
            {users.map((user, index) => (
              <SearchUserCard key={index} user={user}></SearchUserCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUsers;
