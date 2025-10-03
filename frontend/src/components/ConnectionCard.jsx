import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ConnectionCard = ({ connection }) => {
  const loggedInUser = useSelector((store) => store.user);
  const allRequests = useSelector((store) => store.allRequestsSlice);
  const dispatch = useDispatch();

  if (!connection) return null;
  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = connection;

  return (
    <>
      <div className="w-full px-8 sm:px-15 bg-gray-950/50 h-15 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
          />
          <h2 className="text-md font text-white ">
            {firstName} {lastName}
          </h2>
        </div>
        <div>
          <Link to={"/view/connection/"+_id} className="bg-blue-500 inline-block px-4 sm:px-5 py-1 text-white rounded-2xl cursor-pointer hover:bg-blue-600 transform transition-transform duration-300 hover:scale-108">view</Link>
        </div>
       
        </div>
      <div className=" border border-gray-600"></div>
    </>
  );
};

export default ConnectionCard;
