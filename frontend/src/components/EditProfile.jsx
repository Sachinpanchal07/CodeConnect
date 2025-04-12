import React, { use } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import addUser from "../utils/userSlice";
import EditProfileCard from "./EditProfileCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  setInterval(() => {
    setToast(false);
  }, 3000);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true }
      );

      setToast(true);
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("");
      }
    }
  };

  return (
    <>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mx-10 flex-wrap">
        <div className="flex justify-center items-center m-5">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-86">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Edit Profile
            </h2>
            <form>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full px-4 py-1 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="w-full px-4 py-1 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-700 font-medium">
                  Photo Url
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="w-full px-4 py-1 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-700 font-medium">
                  age
                </label>
                <input
                  type="text"
                  value={age}
                  className="w-full px-4 py-1 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-700 font-medium">
                  skills
                </label>
                <input
                  type="text"
                  value={skills.join(", ")}
                  className="w-full px-4 py-1 mt-1 border rounded-lg"
                  onChange={(e) => {
                    setSkills([e.target.value]);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-700 font-medium">
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  className="w-full px-4 py-1 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-700 font-medium">
                  About
                </label>
                <input
                  type="text"
                  value={about}
                  className="w-full px-4 py-1 mt-1 border rounded-lg "
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
              </div>
              <p className="text-red-400 text-sm m-2">{error}</p>

              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                type="button"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
        <EditProfileCard
          user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
        ></EditProfileCard>
      </div>
    </>
  );
};

export default EditProfile;
