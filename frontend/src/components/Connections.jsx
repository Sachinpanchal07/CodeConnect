import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard.jsx";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // useEffect(()=>{
  //   console.log(connections); 
  // },[connections])

  if(!connections) return;
  if(connections.length === 0){
    return <h1 className="mt-10 flex justify-center">No Connections found</h1>
  }

  return (
    <div className="flex flex-wrap justify-center">
      {
        connections.map((connection,index)=>(
          <ConnectionCard key={index} connection={connection}></ConnectionCard>
        ))
      }
    </div>
  )
};

export default Connections;
