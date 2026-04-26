import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromRequests } from "../utils/allRequestsSlice";
import { removeConnections } from "../utils/connectionSlice";
import { toast } from "react-toastify";

const ViewConnection = () => {
  const { connectionId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const loggedInUser = useSelector((store) => store.user);
  const allRequests = useSelector((store) => store.allRequestsSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + `/connection/${id}`, {
        withCredentials: true,
      });
      const fetchedUser = res?.data?.user;
      setUser(fetchedUser);
      // console.log(res.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveConnection = async () => {
    try {
      setLoading(true);
      const isConfirm = confirm("Are you sure to remove connection");
      // console.log("before removed", allRequests)
      if (isConfirm) {
        const reqIdArray = allRequests.filter(
          (req) =>
            (req.fromUserId == user?._id && req.toUserId == loggedInUser._id) ||
            (req.toUserId == user?._id && req.fromUserId == loggedInUser._id)
        );
        // console.log("array of reqidarr ", reqIdArray);
        const reqId = reqIdArray[0]._id;
        await axios.delete(BASE_URL + "/request/remove/" + reqId, {
          withCredentials: true,
        });

        dispatch(removeFromRequests(reqId));
        dispatch(removeConnections(user?._id));
        navigate("/Connections");

        // console.log("after removed" + allRequests);
        toast.success("Connection Removed Successfully");
      } else {
        console.log("command revoked");
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(connectionId);
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <BeatLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-950 pt-28 pb-10 px-4 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-950 to-gray-950">
          <div className="max-w-3xl mx-auto">
            
            {/* Back Button */}
            <button 
              onClick={() => navigate(-1)} 
              className="text-gray-500 hover:text-white mb-6 flex items-center gap-2 text-sm transition-colors cursor-pointer"
            >
              <i className='bx bx-left-arrow-alt text-xl'></i> Back to Network
            </button>

            {/* Profile Card */}
            <div className="bg-gray-900/50 border border-gray-800 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
              
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-900 opacity-20"></div>

              <div className="px-6 py-8 sm:px-12 -mt-16">
                <section className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                  <figure className="relative">
                    <img
                      src={user?.photoUrl}
                      alt="profile"
                      className="h-40 w-40 rounded-3xl object-cover border-4 border-gray-900 shadow-2xl bg-gray-800"
                    />
                    {user?.isPremium && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 p-2 rounded-full border-4 border-gray-900">
                        <i className='bx bxs-badge-check text-white text-xl'></i>
                      </div>
                    )}
                  </figure>

                  <div className="flex-1 pb-2">
                    <h1 className="text-3xl font-black text-white tracking-tight">
                      {user?.firstName} {user?.lastName}
                    </h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                      <a href="#" className="text-gray-400 hover:text-blue-400 text-sm flex items-center gap-1 transition-colors">
                        <i className='bx bxl-github text-lg'></i> GitHub
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-400 text-sm flex items-center gap-1 transition-colors">
                        <i className='bx bxl-linkedin-square text-lg'></i> LinkedIn
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 md:pb-2">
                    <button
                      onClick={() => handleRemoveConnection()}
                      className="px-6 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-sm font-bold transition-all cursor-pointer"
                    >
                      Disconnect
                    </button>
                    <Link
                      to={"/chat/" + user?._id}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm font-bold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
                    >
                      Message
                    </Link>
                  </div>
                </section>

                <hr className="my-8 border-gray-800" />

                {/* Bio & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">About</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {user?.about || "No bio provided."}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {user?.skills?.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-lg uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewConnection;
