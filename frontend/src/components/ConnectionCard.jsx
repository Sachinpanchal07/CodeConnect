import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeFromRequests } from "../utils/allRequestsSlice";
import { removeConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const ConnectionCard = ({ connection }) => {
  const loggedInUser = useSelector((store) => store.user);
  const allRequests = useSelector((store) => store.allRequestsSlice);
  const dispatch = useDispatch();

  if (!connection) return null;
  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = connection;

  const handleRemoveConnection = async () => {
    try {
      const isConfirm = confirm("Are you sure to remove connection");
      // console.log("before removed", allRequests)
      if (isConfirm) {
        const reqIdArray = allRequests.filter(
          (req) =>
            (req.fromUserId == _id && req.toUserId == loggedInUser._id) ||
            (req.toUserId == _id && req.fromUserId == loggedInUser._id)
        );
        const reqId = reqIdArray[0]._id;
        await axios.delete(BASE_URL + "/request/remove/" + reqId, {
          withCredentials: true,
        });

        dispatch(removeFromRequests(reqId));
        dispatch(removeConnections(_id));
        // console.log("after removed" + allRequests);
        toast.success("Connection Removed Successfully");
      } else {
        console.log("command revoked");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 shadow-lg rounded-2xl p-6 m-4 w-80 flex flex-col items-center hover:scale-105 transition-transform duration-300">
      <img
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md"
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {firstName} {lastName}
      </h2>
      <p className="text-gray-600 text-sm mb-1">Age: {age}</p>
      <p className="text-gray-600 text-sm mb-1">Gender: {gender}</p>
      {skills?.length > 0 && (
        <p className="text-gray-600 text-sm mb-1">
          skills: {skills.join(" | ")}
        </p>
      )}
      <p className="text-gray-700 text-center text-sm mt-2 italic">{about}</p>
      <div>
        <button
          className="cursor-pointer text-white bg-red-500 hover:bg-red-600 px-4 py-1 m-2 rounded"
          onClick={handleRemoveConnection}
        >
          Disconnect
        </button>
        <Link
          to={"/chat/" + _id}
          className="inline-block cursor-pointer text-white bg-green-600 hover:bg-green-700 px-4 py-1 m-2 rounded"
        >
          Chat
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCard;
