import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import {BeatLoader} from "react-spinners";


const ViewConnection = () => {
    const { connectionId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchUser = async (id) =>{
        try{
            setLoading(true);
            const res = await axios.get(BASE_URL+`/connection/${id}`, {withCredentials:true})
            const fetchedUser = res?.data?.user;
            setUser(fetchedUser);
            console.log(res.data.user);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

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


  useEffect(()=>{
    fetchUser(connectionId);
  },[]);



  return (
    <>
        { loading ? <BeatLoader></BeatLoader> :
            <div className="min-h pt-25 pb-10 bg-gray-800 text-white">
            <div className="min-h-[400px] flex flex-col w-full sm:w-2xl bg-gray-950/50 mx-auto p-5 sm:p-8 sm:rounded-lg">
                <section className="flex flex-col sm:flex-row gap-12">

                <figure className="flex-shrink-0 ">
                    <img src="#" alt="" className="bg-blue-500 h-35 w-35 rounded-full" />
                </figure>
                <div className="">
                    <h2 className="text-2xl font-bold pt- flex items-center gap-2">
                    {user?.firstName + " " + user?.lastName}
                    {user?.isVerfied && <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold">
                        ✓
                    </span>}
                    </h2>

                    <div className="flex mt-3 gap-4">
                    <button
                        className="px-4 py-0.5 text-sm rounded-xl cursor-pointer border border-red-400 text-red-400 transition-transform hover:scale-105 duration-300"
                        onClick={() => handleRemoveConnection()}
                    >
                        Disconnect
                    </button>

                    <Link
                        to="/chat"
                        className="inline-block text-sm px-4 py-0.5 rounded-xl bg-gray-800 text-gray-200 font-semibold 
                            border border-gray-600 hover:bg-gray-700 hover:text-white 
                            transition hover:scale-105 duration-300 shadow-md"
                    >
                        Message
                    </Link>
                    </div>

                    <div className="flex gap-2 mt-4">
                    <a href="#" target="_blank" className="text-blue-500 text-sm">
                        GitHub
                    </a>{" "}
                    {/* <span className="text-gray-500">|</span> */}
                    <a href="#" target="_blank" className="text-blue-500 text-sm">
                        LinkedIn
                    </a>
                    </div>

                    <div className="mt-3">
                    <h2 className="text-sm text-gray-300 py-1">
                        MongoDB | JS | Java | Python | React{" "}
                    </h2>
                    <h2 className="text-sm text-gray-400 py-1 ">
                        Quam, penatibus at. Tincidunt aliquet. Posuere asdfsdf sdf sadfa
                        sdfaasdfsdf . asdf asldfa sdfj
                    </h2>
                    </div>
                </div>
                </section>

            </div>
            </div>
        }
    </>
  );
};

export default ViewConnection;
