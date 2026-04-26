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

  // ... (reviewRequest and fetchRequests functions remain identical)
  const reviewRequest = async (status, _id) => {
    try {
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

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="text-center p-10 border border-gray-800 rounded-3xl bg-gray-900/50 backdrop-blur-xl">
          <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Requests Found</h2>
          <p className="text-gray-400">When people want to connect, they'll show up here.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="min-h-screen pt-28 pb-10 bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8 px-2">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Requests</h1>
                <p className="text-gray-400 text-sm mt-1">Manage your incoming developer connections</p>
              </div>
              <span className="bg-blue-600/10 text-blue-400 border border-blue-600/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {requests.length} Pending
              </span>
            </div>

            {/* Request Container */}
            <div className="space-y-4">
              {requests.map((request, index) => {
                return (
                  <div key={index} className="transform transition-all hover:scale-[1.01]">
                    <RequestCard
                      request={request.fromUserId}
                      reviewRequest={reviewRequest}
                      requestId={request._id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Requests;
