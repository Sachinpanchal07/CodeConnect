import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

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
    if (cookie) {
      getFeed();
      return;
    }
    navigate("/login");
  }, []);

  if (!feed) return;
  if (feed.length === 0) {
    return (
      <p className="h-screen flex justify-center text-xl pt-40 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">No new users found !</p>
    );
  }

  return (
    feed && (
      <div className="bg-gradient-to-br 
                from-orange-100 via-white to-orange-200 
                dark:from-neutral-800 dark:via-neutral-900 dark:to-black">
        <div className="h-screen flex justify-center align-center ">
          <div className="text-center hidden lg:block w-1/2 pt-20 ml-[-100px]">
            <p className="text-[70px] font-bold dark:text-neutral-100 ">FIND YOUR</p>

            <div className="leading-[1]">
              <p className="text-[70px] font-bold italic text-transparent bg-clip-text bg-gradient-to-b from-orange-600 to-orange-300">
                CODING
              </p>
              <p className="text-[70px] font-bold italic text-transparent bg-clip-text bg-gradient-to-t from-orange-600 to-orange-300">
                BUDDY
              </p>
            </div>
          </div>
          <div className="lg: ">
            <UserCard user={feed[0]}></UserCard>
          </div>
        </div>
      </div>
    )
  );
};

export default Feed;
