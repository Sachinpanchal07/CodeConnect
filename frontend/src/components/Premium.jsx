import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";

const Premium = () => {
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  // verify is user premium or not.
  const verifyPremiumUser = async () => {
    try{
        const res = await axios.get(BASE_URL + "/premium/verify", {withCredentials:true});
        setIsUserVerified(res.data.isVerify);
    }catch(err){
      console.log("Error in verify premium user", err);
    }
    
  };

  // handle click pay 700 button.
  const handleUpgradeClick = async (type) => {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = res.data;
      const options = {
        key: "rzp_test_RHAQYjAo53x59u",
        amount,
        currency,
        name: "CodeConnect",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: 9999999999,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      // It will open the razorpay dialog box
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Something went wront, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-6 justify-center mt-10">
        <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 text-white rounded-xl shadow-lg p-6 w-100">
          <h2 className="text-xl font-bold text-center mb-3">
            Gold Membership
          </h2>
          <ul className="text-sm space-y-2 mb-4">
            <li>✔ Infinite live chat</li>
            <li>✔ User search service</li>
            <li>✔ Exclusive Badge</li>
            <li>✔ Early Feature Access</li>
          </ul>
          <button
            onClick={() => handleUpgradeClick("gold")}
            className="w-full bg-white text-amber-600 font-semibold py-2 rounded-lg hover:bg-yellow-100 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? <BeatLoader></BeatLoader> : "₹700"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
