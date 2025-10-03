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

  // useEffect(()=>{
  //   console.log(connections);
  // },[connections])

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <>
        {loading ? (
          <BeatLoader className="min-h-screen pt-50 text-center" />
        ) : (
          <h1 className="pt-50 text-gray-300 sm:text-xl md:text-2xl  flex justify-center min-h-screen">
            No Connections found !!
          </h1>
        )}
      </>
    );
  }

  return (
    <>
      {loading ? (
        <BeatLoader className="min-h-screen pt-50 text-center" />
      ) : (
        <div className="min-h-screen pt-25 bg-gray-950/50">
          <div className="min-h-[500px] flex flex-col w-full sm:w-2xl bg-gray-800 mx-auto sm:rounded-md p-1">
            {connections.map((connection, index) => (
              <ConnectionCard
                key={index}
                connection={connection}
              ></ConnectionCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Connections;
