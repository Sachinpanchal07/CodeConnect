import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactTyped } from "react-typed";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookie = document.cookie;

  const getFeed = async () => {
    try {
      if (feed.length > 0) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    if (cookie) {
      getFeed();
    } else {
      navigate("/login");
    }
  }, []);

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-xl sm:text-3xl font-light text-gray-500 animate-pulse">
          No new users found!
        </p>
      </div>
    );
  }

  return (
    feed && (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black pt-20 overflow-hidden">
        {/* Decorative Background Elements for Depth */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-around gap-10">
          
          
          <div className="hidden lg:flex flex-col items-start justify-center space-y-2 select-none">
            <h1 className="text-7xl xl:text-8xl font-black tracking-tighter transition-all duration-500 hover:tracking-normal cursor-default">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent block">Connect.</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent block">Code.</span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent block">Collaborate.</span>
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent block">Conquer.</span>
            </h1>
            <div className="pt-4 pl-2 text-gray-400 text-lg font-medium border-l-2 border-blue-500/50">
              <ReactTyped
                strings={["Discover your next partner", "Find the best developers"]}
                typeSpeed={50}
                backSpeed={30}
                loop
              />
            </div>
          </div>

          {/* Right Card Section*/}
          <div className="relative z-10 py-10 transition-transform duration-500 hover:scale-[1.02]">
             
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-purple-500/20 blur-3xl opacity-50"></div>
            <div className="relative">
              <UserCard user={feed[0]} />
            </div>
          </div>

        </div>
      </div>
    )
  );
};

export default Feed;