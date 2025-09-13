import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
// import { options } from "../../../backend/src/router/payments";

const Premium = () => {
  const handleUpgradeClick = async (type) => {
    const res = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    console.log(res);
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
    };

    // It will open the razorpay dialog box
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <div className="flex gap-6 justify-center mt-10">
        <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 text-white rounded-xl shadow-lg p-6 w-64">
          <h2 className="text-xl font-bold text-center mb-3">Gold Membership</h2>
          <ul className="text-sm space-y-2 mb-4">
            <li>✔ SecureSide Access</li>
            <li>✔ Priority Connections</li>
            <li>✔ Exclusive Badge</li>
            <li>✔ Early Feature Access</li>
          </ul>
          <button
            onClick={()=>handleUpgradeClick("gold")}
            className="w-full bg-white text-amber-600 font-semibold py-2 rounded-lg hover:bg-yellow-100 transition"
          >
            ₹700
          </button>
        </div>

        <div className="bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white rounded-xl shadow-lg p-6 w-64">
          <h2 className="text-xl font-bold text-center mb-3">Silver Membership</h2>
          <ul className="text-sm space-y-2 mb-4">
            <li>✔ Standard Access</li>
            <li>✔ Basic Connections</li>
            <li>✔ Community Support</li>
          </ul>
          <button
            onClick={()=>handleUpgradeClick("silver")}
            className="w-full bg-white text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
          >
            ₹500
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
