import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {toast} from "react-toastify";
import {BeatLoader} from 'react-spinners';


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      dispatch(addUser(res.data));
      // console.log(res);
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    } finally{
      setLoading(false);
    }
    
  };

  // handle signup
  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      const user = res.data.data;
      if(user.isVerified){
        dispatch(addUser(res.data.data));
        return navigate("/profile");
      }
      else {
        navigate("/verify-otp", {state: { emailId }})
      }

      
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
    finally{
      setLoading(false);
    }
  };

  // handle if user already logged in
  useEffect(()=>{
    const cookie = document.cookie;
    if (cookie.includes("token=")) {   // only redirect if token exists
    navigate("/");
    }
  },[navigate])

  return (
    <div className="flex justify-center items-center m-5 dark:text-neutral-300">
      <div className="dark:bg-neutral-600  p-6 rounded-2xl shadow-xl w-96">
        {/* <p className="flex justify-center text-xl font-bold dark:text-neutral-200">CodeConnect</p> */}
        <h2 className="text-xl font-semibold  text-center mb-4">
          {isLoginForm ? "Log in" : "Sign up"}
        </h2>
        <form>
          
          {!isLoginForm && (
            <>
              <div className="mb-4">
                <label className="block  font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  className="w-full px-4 py-2 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block  font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  className="w-full px-4 py-2 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block  font-medium">Email</label>
            <input
              placeholder="Enter gmail address"
              type="email"
              value={emailId}
              className="w-full px-4 py-2 mt-1 border rounded-lg "
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block  font-medium">Password</label>
            <input
              placeholder="Enter password"
              type="password"
              value={password}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <p className="text-red-400 m-5">{error}</p>
          <button
            className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            type="button"
            onClick={isLoginForm ? handleLogin : handleSignup}
          >
            {loading == false ? isLoginForm ? "Login" : "Sign Up" : <BeatLoader/>}
          </button>

          <p
            className="cursor-pointer mt-2 flex justify-center "
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? <p>New User? <span className="text-blue-600 underline">SignUp here</span></p>
              : <p>Existing User? <span className="text-blue-600 underline">Login Here</span></p>}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
