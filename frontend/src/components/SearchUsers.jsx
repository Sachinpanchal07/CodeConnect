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
    <div className="min-h-screen bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-950 to-gray-950 pt-28 pb-10 px-4">
      
      {/* Header Section */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight">
          Find your coding-buddy
        </h2>
        <p className="text-gray-500 text-sm mt-2 font-medium uppercase tracking-widest">
          Search by skill to connect with developers
        </p>
      </div>

      {/* Search Input Section */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
            <i className="bx bx-search text-xl"></i>
          </div>
          <input
            value={searchedSkill}
            onChange={(e) => setsearchedSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getUsers()}
            placeholder="Search skills (e.g. React, Node, Python)"
            className="w-full bg-gray-900/50 border border-gray-800 text-white pl-12 pr-28 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all backdrop-blur-md"
          />
          <button
            onClick={getUsers}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BeatLoader color="#3b82f6" />
            <p className="text-gray-600 text-xs mt-4 font-bold uppercase tracking-widest">Searching the network...</p>
          </div>
        ) : (
          <div className="space-y-4 min-h-[400px]">
            {users.length > 0 ? (
              users.map((user, index) => (
                <div key={index} className="animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                  <SearchUserCard user={user} />
                </div>
              ))
            ) : (
              !loading && searchedSkill && (
                <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-gray-800/50 border-dashed">
                  <i className="bx bx-user-x text-5xl text-gray-700 mb-2"></i>
                  <p className="text-gray-500 font-medium">No buddies found for this skill yet.</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
