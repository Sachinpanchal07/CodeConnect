import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle login
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong !");
    } finally {
      setLoading(false);
    }
  };

  // handle signup
  const handleSignup = async () => {
    try {
      setLoading(true);
      if (firstName.length < 4) {
        setError("Error: Use atleast 4 characters in name");
        return;
      }
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      const user = res.data.data;
      // console.log("user from server", user);
      if (user.isVerified) {
        dispatch(addUser(res.data.data));
        return navigate("/profile");
      } else {
        // console.log("i'm in login page with navigate")
        navigate("/verify-otp", { state: { emailId } });
      }
    } catch (err) {
      setError(err?.response?.data || "Error: Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // handle if user already logged in
  useEffect(() => {
    const cookie = document.cookie;
    if (cookie.includes("token=")) {
      navigate("/feed");
    }
  }, [navigate]);

  return (
    <>
      <NavBar></NavBar>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 Z flex justify-center items-center ">
        <div className="bg-gray-900 text-gray-400 p-6 rounded-2xl shadow-xl w-80 sm:w-110">
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-blue-300 to-cyan-300 bg-clip-text text-transparent text-center mb-4">
            {isLoginForm ? "Welcome Back 👋" : "Create an Account"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <div className="mb-4">
                  <label className="block font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    className="w-full px-4 py-2 mt-1 border outline-gray-400 rounded-lg "
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    className="w-full px-4 py-2 mt-1 border outline-gray-400 rounded-lg "
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block font-medium">Email</label>
              <input
                placeholder="Enter gmail address"
                type="email"
                value={emailId}
                className="w-full px-4 py-2 mt-1 border outline-gray-400 rounded-lg "
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div className="mb-4 relative"> 
              <label className="block font-medium">Password</label>
              <div className="relative">
                <input
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="w-full px-4 py-2 mt-1 border outline-gray-400 rounded-lg"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-0.5 text-sm hover:text-blue-500 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <p className="text-red-400 m-5">{error}</p>
            <button
              className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              type="button"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {loading === false ? (
                isLoginForm ? "Login" : "Sign Up"
              ) : (
                <BeatLoader color="#ffffff" size={10} />
              )}
            </button>

            <div
              className="cursor-pointer mt-2 flex justify-center "
              onClick={() => {
                setIsLoginForm((value) => !value);
                setError(""); 
              }}
            >
              {isLoginForm ? (
                <p>
                  <span>👉</span>New User?{" "}
                  <span className="text-blue-600 underline">SignUp here</span>
                </p>
              ) : (
                <p>
                  <span>👈</span>Existing User?{" "}
                  <span className="text-blue-600 underline">Login Here</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;