import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ConnectionCard = ({ connection }) => {
  const loggedInUser = useSelector((store) => store.user);
  const allRequests = useSelector((store) => store.allRequestsSlice);
  const dispatch = useDispatch();

  if (!connection) return null;
  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = connection;

  return (
    <div className="group transition-all duration-300">
      <div className="w-full px-4 py-4 flex justify-between items-center bg-transparent">
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-12 h-12 rounded-xl object-cover border border-gray-700 group-hover:border-blue-500/50 transition-colors shadow-lg"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              {firstName} {lastName}
            </h2>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
              {gender} • {age}
            </p>
          </div>
        </div>

        <div>
          <Link 
            to={"/view/connection/" + _id} 
            className="bg-blue-600/10 text-blue-400 border border-blue-600/20 px-5 py-1.5 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View Profile
          </Link>
        </div>
        
      </div>
      
      <div className="mx-4 border-b border-gray-800/50"></div>
    </div>
  );
};

export default ConnectionCard;