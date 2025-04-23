import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

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
    }
  };

  return (

    <div className="flex justify-center m-6">
      <div className="w-80 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <figure className="rounded-t-xl overflow-hidden">
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-60 object-cover"
          />
        </figure>
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-500 text-sm mb-2">{age + ", " + gender}</p>
          )}
          {skills?.length > 0 && (
            <p className="text-gray-600 text-sm mb-1">
              skills: {skills.join(" | ")}
            </p>
          )}

          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{about}</p>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-1 text-sm rounded-full border border-red-400 text-red-400 hover:bg-red-100 transition"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="px-4 py-1 text-sm rounded-full border border-green-400 text-green-400 hover:bg-green-100 transition"
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
