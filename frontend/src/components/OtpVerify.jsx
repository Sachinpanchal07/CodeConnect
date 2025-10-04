import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailId = location.state?.emailId;
  // console.log("passed email is ", emailId);

  
  useEffect(() => {
    if (!emailId) {
      navigate("/login");
      // console.log("i am in useEffec with email ", emailId);
    }
  }, [emailId, navigate]);



  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      if (otp == "") throw new Error("Please enter valid OTP!");
      const res = await axios.post(
        BASE_URL + "/verify-otp",
        { emailId, otp },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      toast.success("OTP verified successfully!");
      navigate("/profile");
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid OTP!, Try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/resend-otp",
        { emailId },
        { withCredentials: true }
      );
      toast.info("New OTP sent to your email.");
    } catch (err) {
      setError(err?.response?.data || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-6 mx-2 rounded-2xl shadow-xl w-96 bg-gray-700">
        <p className="text-sm text-center mb-4 text-gray-200">
          We have sent a 6 digit OTP to{" "}
          <span className="font-medium">{emailId}</span>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          className="text-gray-200 w-full px-4 py-2 mb-4 border border-gray-400 rounded-lg text-center tracking-widest"
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-3 cursor-pointer"
          onClick={handleVerifyOtp}
          disabled={loading}
        >
          {loading ? <BeatLoader /> : "verify OTP"}
        </button>

        <p className="text-center text-gray-300">
          Didn't get OTP ?{" "}
          <span
            onClick={handleResendOtp}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}

export default OtpVerify;
