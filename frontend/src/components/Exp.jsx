import React from "react";

const RequestCard = ({ request, reviewRequest, requestId }) => {
  if (!request) return null;

  const { firstName, lastName, age, gender, photoUrl, about, skills } = request;

  return (
    <div className="bg-blue-50 shadow-lg rounded-2xl p-6 m-4 w-72 flex flex-col items-center transition-transform hover:scale-105">
      <img
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-400"
      />
      <h2 className="text-xl font-bold mb-1">
        {firstName} {lastName}
      </h2>
      <p className="text-gray-700 text-sm mb-1">Age: {age}</p>
      <p className="text-gray-700 text-sm mb-1">Gender: {gender}</p>
      {skills?.length > 0 && (
        <p className="text-gray-600 text-sm mb-1">
          skills: {skills.join(" | ")}
        </p>
      )}
      <p className="text-gray-600 text-center text-sm mb-4">{about}</p>

      <div className="flex space-x-4">
        <button
          onClick={() => reviewRequest("accepted", requestId)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Accept
        </button>
        <button
          onClick={() => reviewRequest("rejected", requestId)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
