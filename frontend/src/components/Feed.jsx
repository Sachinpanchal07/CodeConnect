import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";
import {useNavigate} from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookie = document.cookie;

  const getFeed = async () => {
    try {
      if (feed) {
        return;
      }
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
      // console.log(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(cookie){
      getFeed()
      return;
    };
    navigate("/login");
   
  }, []);

  if(!feed) return
  if(feed.length === 0){
    return (<p className="flex justify-center text-xl mt-10">No new users found !</p>)
  }

  return (
    feed && (
      <div className="flex justify-center align-center ">
        <div className="text-center hidden lg:block w-1/2 bg-gray-600 pt-15">
          <p className="text-[70px] font-bold pb-5">FIND YOUR</p>
          <p className="text-[70px] font-bold  leading-[0] pb-5">CODING</p>
          <p className="text-[70px] font-bold">BUDDY</p>
        </div>
        <div className="lg: ">
          <UserCard user = {feed[0]}></UserCard>
        </div>
    </div>
    )
  );
};

export default Feed;
