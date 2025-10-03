import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { removeSearchUser } from "../utils/searchSlice";
import { toast } from "react-toastify";

const UserCard = ({ user }) => {
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

  return (
    <div className="flex justify-center m-6">
      <div className="w-80 text-gray-300 bg-gray-900/70 p-8 rounded-xl shadow-xl transition-transform duration-500 ease-in-out hover:scale-103 ">
        {/* Image */}
        <figure className="rounded-xl overflow-hidden">
          <img
            src={photoUrl}
            alt="user photo"
            className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
          />
        </figure>

        {/* Content */}
        <div className="pt-4 ">
          <h2 className="text-2xl flex items-center gap-2 font-bold mb-1 py-3  bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {firstName + " " + lastName}
            {isPremium && (
              <span className="flex items-center justify-center mt-1 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold">
                ✓ 
              </span>
            )}
          </h2>

          {age && gender && (
            <p className="text-sm font-bold  mb-1">{`${age}, ${gender}`}</p>
          )}

          {skills?.length > 0 && (
            <p className="text-sm font-bold mb-2">
              Skills: <span className="font-medium ">{skills.join(" | ")}</span>
            </p>
          )}

          <p className="text-sm mb-4 leading-relaxed">{about}</p>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="px-4 py-1 rounded-md cursor-pointer border border-red-400 text-red-400 transition-transform hover:scale-105 duration-300"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="px-4 py-1 text-white rounded-md cursor-pointer bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 transition-transform hover:scale-105 duration-300"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
