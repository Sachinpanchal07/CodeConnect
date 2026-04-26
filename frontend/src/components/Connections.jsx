import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard.jsx";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        {loading ? (
          <BeatLoader color="#3b82f6" />
        ) : (
          <div className="text-center p-10 border border-gray-800 rounded-3xl bg-gray-900/50 backdrop-blur-md">
            <h1 className="text-gray-400 text-xl font-medium tracking-tight">
              No Connections found !!
            </h1>
            <p className="text-gray-600 text-sm mt-2">Start exploring to build your network.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-950 pt-28 pb-10 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Simple Header */}
            <div className="mb-8 px-2">
              <h1 className="text-3xl font-black text-white tracking-tight">My Network</h1>
              <p className="text-gray-400 text-sm">You have {connections.length} active connections</p>
            </div>

            {/* Connections List Container */}
            <div className="bg-gray-900/40 border border-gray-800/60 rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
              <div className="divide-y divide-gray-800/50">
                {connections.map((connection, index) => (
                  <div key={index} className="transition-colors hover:bg-gray-800/30">
                    <ConnectionCard connection={connection} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Connections;
