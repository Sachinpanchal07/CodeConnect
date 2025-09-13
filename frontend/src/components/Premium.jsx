import React from "react";

const Premium = () => {
  return (
    <div>
      <div class="flex gap-6 justify-center mt-10">
        <div class="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 text-white rounded-xl shadow-lg p-6 w-64">
          <h2 class="text-xl font-bold text-center mb-3">Gold Membership</h2>
          <ul class="text-sm space-y-2 mb-4">
            <li>✔ SecureSide Access</li>
            <li>✔ Priority Connections</li>
            <li>✔ Exclusive Badge</li>
            <li>✔ Early Feature Access</li>
          </ul>
          <button class="w-full bg-white text-amber-600 font-semibold py-2 rounded-lg hover:bg-yellow-100 transition">
            Upgrade
          </button>
        </div>

        <div class="bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white rounded-xl shadow-lg p-6 w-64">
          <h2 class="text-xl font-bold text-center mb-3">Silver Membership</h2>
          <ul class="text-sm space-y-2 mb-4">
            <li>✔ Standard Access</li>
            <li>✔ Basic Connections</li>
            <li>✔ Community Support</li>
          </ul>
          <button class="w-full bg-white text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
