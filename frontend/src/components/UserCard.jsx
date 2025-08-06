import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import {toast} from "react-toastify";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
<div className="flex justify-center m-6">
  <div className="w-80 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-xl shadow-xl shadow-orange-500/50 hover:shadow-orange-500/30 transition-shadow duration-300">
    {/* Imaeg */}
    <figure className="rounded-t-xl overflow-hidden">
      <img
        src={photoUrl}
        alt="photo"
        className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
      />
    </figure>

    {/* Content */}
    <div className="p-5 ">
      <h2 className="text-2xl font-semibold mb-1">
        {firstName + " " + lastName}
      </h2>

      {age && gender && (
        <p className="text-sm font-bold  mb-1">{`${age}, ${gender}`}</p>
      )}

      {skills?.length > 0 && (
        <p className="text-sm font-bold mb-2">
          Skills: <span className="font-medium ">{skills.join(" | ")}</span>
        </p>
      )}

      <p className="text-sm mb-4 leading-relaxed">{about}</p>

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-1 text-sm rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-neutral-800 transition"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          Ignore
        </button>
        <button
          className="px-4 py-1 text-sm rounded-full border border-orange-400 text-black bg-orange-400 hover:bg-orange-500 transition"
          onClick={() => handleSendRequest("interested", _id)}
        >
          Interested
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default UserCard;
