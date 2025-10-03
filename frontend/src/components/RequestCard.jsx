import React, { useState } from "react";

const RequestCard = ({ request, reviewRequest, requestId }) => {
  if (!request) return null;

  const { firstName, lastName, age, gender, photoUrl, about, skills, isPremium } = request;

  const [showFullView, setShowFullView] = useState(false);

  const fullView = (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="min-h-[400px] w-[90%] sm:w-[600px] bg-gray-900 p-6 rounded-lg shadow-lg text-white relative">
        <button
          className="absolute top-2 right-3 text-white text-3xl font-bold cursor-pointer hover:scale-110"
          onClick={() => setShowFullView(false)}
        >
          <i className='bx bxs-x-circle'></i> 
        </button>

        <section className="flex flex-col sm:flex-row gap-8">
          <figure className="flex-shrink-0">
            <img
              src={photoUrl}
              alt="profile"
              className="bg-blue-500 h-32 w-32 rounded-full border-2 border-white"
            />
          </figure>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {firstName + " " + lastName}
              {isPremium && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold">
                  ✓
                </span>
              )}
            </h2>

            <div className="mt-3">
              <div className="text-sm text-gray-300">
                <span>{age},</span> <span>{gender}</span>
              </div>
              <h2 className="text-sm text-gray-300 py-1 font-semibold">
                {skills.join(" | ")}
              </h2>
              <h2 className="text-sm text-gray-400 py-1">{about}</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full px-2 sm:px-15 bg-gray-950/50 h-15 flex justify-between items-center relative">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setShowFullView(true)}
        >
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
          />
          <h2 className="text-md font text-white">
            {firstName} {lastName}
          </h2>
        </div>

        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => reviewRequest("accepted", requestId)}
            className="border-2 text-[30px] cursor-pointer transition-transform hover:scale-105"
          >
            <i className="bx bx-check text-white"></i>
          </button>
          <button
            onClick={() => reviewRequest("rejected", requestId)}
            className="text-red-400 border-2  px-1.5 py-1 rounded-sm text-[10px] cursor-pointer transition-transform hover:scale-105"
          >
            ❌
          </button>
        </div>
      </div>

      <div className="border border-gray-600"></div>

      {showFullView && fullView}
    </>
  );
};

export default RequestCard;
