import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { removeSearchUser } from "../utils/searchSlice";
import { toast } from "react-toastify";
import { useState } from "react";
const SearchUserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
    isPremium,
  } = user;
  // console.log(user);

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
      if (status == "interested") toast.success("Request sent");
    } catch (err) {
      console.error(err.message);
      toast.error(err?.response?.data?.message);
    }
  };

  const fullView = (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="min-h-[400px] w-[90%] sm:w-[600px] bg-gray-900 p-6 rounded-lg shadow-lg text-white relative">
        <button
          className="absolute top-2 right-3 text-white text-3xl font-bold cursor-pointer hover:scale-110"
          onClick={() => setShowFullView(false)}
        >
          <i className="bx bxs-x-circle"></i>
        </button>

        <section className="flex flex-col sm:flex-row gap-8">
          <figure className="flex-shrink-0">
            <img
              src={photoUrl}
              alt="profile"
              className="bg-blue-500 h-32 w-32 rounded-full border-2 border-white"
            />
          </figure>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {firstName + " " + lastName}
              {isPremium && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold">
                  ✓
                </span>
              )}
            </h2>

            <div className="mt-3">
              <div className="text-sm text-gray-300">
                <span>{age},</span> <span>{gender}</span>
              </div>
              <h2 className="text-sm text-gray-300 py-1 font-semibold">
                {skills.join(" | ")}
              </h2>
              <h2 className="text-sm text-gray-400 py-1">{about}</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full px-2 sm:px-15 bg-gray-950/50 h-15 flex justify-between items-center relative">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setShowFullView(true)}
        >
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
          />
          <h2 className="text-md font text-white">
            {firstName} {lastName}
          </h2>
        </div>

        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className=" cursor-pointer transition-transform hover:scale-115"
          >
            <i className='bx bxs-plus-square text-xl sm:text-2xl'></i>
          </button>

          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className=" rounded-sm cursor-pointer transition-transform hover:scale-115"
          >
            <i className='bx bx-minus font-bold text-xl sm:text-2xl'></i>
          </button>
          
          
        </div>
      </div>
      <div className="border border-gray-600"></div>

      {showFullView && fullView}
    </>

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
  );
};

export default SearchUserCard;
