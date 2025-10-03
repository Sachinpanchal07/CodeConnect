import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import RequestCard from "./RequestCard";
import { toast } from "react-toastify";

import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard.jsx";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [loading, setLoading] = useState(false);

  // accept or reject req
  const reviewRequest = async (status, _id) => {
    try {
      // console.log(status+_id)
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      toast.success("Connection request " + status + " successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // fetch all requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.connectionRequests));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return (
      <p className="py-60 text-white text-center text-xl md:text-2xl">
        No Connections Requests Found !!
      </p>
    );
  }

  return (
    <>
      {loading ? (
        <BeatLoader className="min-h-screen pt-50 text-center" />
      ) : (
        <div className="min-h-screen pt-25 bg-gray-950/50">
          <div className="min-h-[500px] flex flex-col w-full sm:w-2xl bg-gray-800 mx-auto sm:rounded-md p-1">
            {requests.map((request, index) => {
              return (
                <RequestCard
                  key={index}
                  request={request.fromUserId}
                  reviewRequest={reviewRequest}
                  requestId={request._id}
                ></RequestCard>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Requests;
