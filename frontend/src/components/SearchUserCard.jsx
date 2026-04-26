import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { removeSearchUser } from "../utils/searchSlice";
import { toast } from "react-toastify";

const SearchUserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills, isPremium } = user;
  const dispatch = useDispatch();
  const [showFullView, setShowFullView] = useState(false);

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      dispatch(removeSearchUser(userId));
      if (status === "interested") toast.success("Request sent");
    } catch (err) {
      console.error(err.message);
      toast.error(err?.response?.data?.message);
    }
  };

  const fullView = (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] px-4">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl text-white relative animate-in fade-in zoom-in duration-200">
        <button
          className="absolute top-4 right-5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => setShowFullView(false)}
        >
          <i className="bx bxs-x-circle text-3xl"></i>
        </button>

        <section className="flex flex-col sm:flex-row gap-6">
          <figure className="relative flex-shrink-0 mx-auto sm:mx-0">
            <img
              src={photoUrl}
              alt="profile"
              className="h-32 w-32 rounded-2xl object-cover border-2 border-blue-500/50 shadow-lg shadow-blue-500/10"
            />
          </figure>
          
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-black tracking-tight flex items-center justify-center sm:justify-start gap-2">
              {firstName} {lastName}
              {isPremium && (
                <i className='bx bxs-badge-check text-blue-500 text-xl'></i>
              )}
            </h2>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
              {age} Years • {gender}
            </p>
            
            <div className="mt-4">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter mb-1">Skills</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/20">{s}</span>
                ))}
              </div>
            </div>
            
            <p className="mt-4 text-sm text-gray-400 italic leading-relaxed">"{about}"</p>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="group">
      <div className="w-full px-4 py-3 bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl flex justify-between items-center transition-all hover:bg-gray-800/60 shadow-lg">
        
        {/* User Profile Info */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setShowFullView(true)}
        >
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-12 h-12 rounded-xl object-cover border border-gray-700 group-hover:border-blue-500/50 transition-colors shadow-md"
          />
          <div>
            <h2 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              {firstName} {lastName}
            </h2>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Click to view details</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800 text-gray-400 hover:bg-red-500/10 hover:text-red-500 border border-gray-700 hover:border-red-500/20 transition-all cursor-pointer"
            title="Ignore"
          >
            <i className='bx bx-minus text-xl'></i>
          </button>

          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 border border-blue-600/20 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-lg shadow-blue-500/5"
            title="Connect"
          >
            <i className='bx bx-plus text-xl'></i>
          </button>
        </div>
      </div>

      {showFullView && fullView}
    </div>
  );
};

export default SearchUserCard;

// <div className="flex justify-center m-6">
//   <div className="w-80 text-gray-300 bg-gray-900/70 p-8 rounded-xl shadow-xl transition-transform duration-500 ease-in-out hover:scale-103 ">

//     <figure className="rounded-xl overflow-hidden">
//       <img
//         src={photoUrl}
//         alt="user photo"
//         className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
//       />
//     </figure>

//     <div className="pt-4 ">
//       <h2 className="text-2xl flex items-center gap-2 font-bold mb-1 py-3  bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
//         {firstName + " " + lastName}
//         {isPremium && (
//           <span className="flex items-center justify-center mt-1 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold">
//             ✓
//           </span>
//         )}
//       </h2>

//       {age && gender && (
//         <p className="text-sm font-bold  mb-1">{`${age}, ${gender}`}</p>
//       )}

//       {skills?.length > 0 && (
//         <p className="text-sm font-bold mb-2">
//           Skills: <span className="font-medium ">{skills.join(" | ")}</span>
//         </p>
//       )}

//       <p className="text-sm mb-4 leading-relaxed">{about}</p>

//       {/* Buttons */}
//       <div className="flex justify-between">
//         <button
//           className="px-4 py-1 rounded-md cursor-pointer border border-red-400 text-red-400 transition-transform hover:scale-105 duration-300"
//           onClick={() => handleSendRequest("ignored", _id)}
//         >
//           Ignore
//         </button>
//         <button
//           className="px-4 py-1 text-white rounded-md cursor-pointer bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 transition-transform hover:scale-105 duration-300"
//           onClick={() => handleSendRequest("interested", _id)}
//         >
//           Interested
//         </button>
//       </div>
//     </div>
//   </div>
// </div>