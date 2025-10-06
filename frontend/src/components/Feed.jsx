import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactTyped } from "react-typed";
import { useState } from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // const [showEffect, setShowEffect] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookie = document.cookie;

  const getFeed = async () => {
    try {
      if (feed.length > 0) {
        return;
      }
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  const arr = ["Connect", "Code", "Collaborate", "Conquer"];
  const [idx, setIdx] = useState(0);
  useEffect(()=>{
    setInterval(()=>{
        const interval = setIdx(()=> idx % arr.length + 1)
        return ()=>clearInterval(interval)
    }, 1000)
  })

  useEffect(() => {
    if (cookie) {
      getFeed();
      return;
    } else navigate("/login");
  }, []);

  if (!feed) return;
  if (feed.length === 0) {
    return (
      <p className="min-h-screen text-xl sm:text-2xl text-center text-gray-300 pt-50">
        No new users found !
      </p>
    );
  }

  return (
    feed && (
      <div className="min-h-screen nbg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-30">
        <div className="min-h-screen flex justify-around md:px-40">
          <div className="justity-start bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent text-center text-6xl mt-10 hidden lg:block">
            
            <p className="mb-8 font-bold">Connect</p>
            <p className="mb-8 font-semibold">Code</p>
            <p className="mb-8 font-bold">Colleborate</p>
            <p className="mb-8 font-semibold">Conquer</p>
            
          </div>
          <div className="">
            <UserCard user={feed[0]}></UserCard>
          </div>
        </div>
      </div>
    )
  );
};

export default Feed;
