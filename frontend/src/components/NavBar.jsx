import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="fixed w-full left-0 top-0 z-[100] bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6">
        
        {/* Left: Logo and Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-all tracking-tighter"
          >
            CodeConnect
          </Link>

          {user && (
            <nav className="hidden lg:flex items-center gap-1">
              {["Feed", "Profile", "Connections", "Requests", "Search"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right: User Actions / Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {!user.isPremium && (
                <Link 
                  to="/premium" 
                  className="hidden sm:block text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full hover:bg-orange-500 hover:text-white transition-all"
                >
                  Go Premium
                </Link>
              )}
              
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-white leading-none">Hi, {user.firstName}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Developer</p>
              </div>

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end group">
                <label 
                  tabIndex={0} 
                  className="flex items-center cursor-pointer ring-2 ring-transparent group-hover:ring-blue-500/50 rounded-xl transition-all"
                >
                  <img 
                    src={user.photoUrl} 
                    className="w-10 h-10 rounded-xl object-cover border border-gray-700 shadow-lg" 
                    alt="profile" 
                  />
                </label>
                
                <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-gray-900 border border-gray-800 rounded-2xl w-52 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {/* Mobile-only links */}
                  <div className="lg:hidden border-b border-gray-800 mb-2 pb-2">
                    {["Feed", "Profile", "Connections", "Requests", "Search"].map((item) => (
                      <li key={item}>
                        <Link to={`/${item.toLowerCase()}`} className="flex px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg">{item}</Link>
                      </li>
                    ))}
                  </div>
                  
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 font-bold hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Logout Session
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-5 py-2 text-sm font-bold text-blue-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/login" className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


export default NavBar