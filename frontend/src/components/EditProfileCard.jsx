import React from "react";

const EditProfileCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  return (
    <div className="flex justify-center m-6">
      <div className="w-80 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <figure className="rounded-t-xl overflow-hidden">
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-60 object-cover"
          />
        </figure>
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-500 text-sm mb-2">{age + ", " + gender}</p>
          )}
          {skills?.length > 0 && (
            <p className="text-gray-600 text-sm mb-1">
              skills: {skills.join(" | ")}
            </p>
          )}
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{about}</p>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;
