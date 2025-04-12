import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle login
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
      // console.error(err);
    }
  };

  // handle signup
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center mt-15">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {isLoginForm ? "Login" : "Sign UP"}
        </h2>
        <form>
          {!isLoginForm && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full px-4 py-2 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
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
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={emailId}
              className="w-full px-4 py-2 mt-1 border rounded-lg "
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <p className="text-red m-5">{error}</p>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            type="button"
            onClick={isLoginForm ? handleLogin : handleSignup}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          <p
            className="cursor-pointer mt-2 flex justify-center"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? SignUp here"
              : "Existing User? Login Here"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
