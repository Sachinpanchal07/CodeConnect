import React, { use, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import EditProfileCard from "./EditProfileCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [skills, setSkills] = useState(user.skills || []);
  const [skillData, setSkillData] = useState([]);

  // save profile
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

      toast.success("Profile updated successfully");
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("");
      }
    }
  };

  // get skills
  const getSkills = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/skills", {
        withCredentials: true,
      });

      if (res) {
        setSkillData(() => res.data.data);
      }
      // if (skills) {
      //   console.log(skills);
      // }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const cookie = document.cookie;
    if (cookie) {
      getSkills();
    }
  }, []);

  return (
    <>
      <div className="pt-4 pb-4 flex flex-col sm:flex-row justify-center mx-auto flex-wrap md:w-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-00 md:rounded-2xl hover:border-1 hover:border-blue-400 duration-300 ">
        <div className="flex justify-center items-center m-3 bg-gray-950/50 rounded-xl">
          <div className="p-6 rounded-2xl shadow-xl w-86">
            <h2 className="text-xl font-bold text-gray-300 text-center mb-2">
              Edit Profile
            </h2>
            <form>
              <div className="mb-2">
                <label className="block text-gray-300 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full px-4 py-1 mt-1 border rounded-lg text-gray-400"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-300 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="w-full px-4 py-1 mt-1 border rounded-lg text-gray-400"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-300 font-medium">
                  Photo Url
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="w-full px-4 py-1 mt-1 border rounded-lg text-gray-400 "
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-300 font-medium">
                  age
                </label>
                <input
                  type="text"
                  value={age}
                  className="w-full px-4 py-1 mt-1 border rounded-lg text-gray-400"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="skills"
                  className="block text-sm text-gray-300 font-medium"
                >
                  Skill
                </label>
                <select
                  className="w-full px-4 py-1 mt-1 border rounded-lg text-gray-400 "
                  id="skills"
                  name="skills"
                  onChange={(e) => setSkills((prev)=>[...prev, e.target.value])}
                >
                  <option className="w-full px-4 py-1 mt-1 border rounded-lg text-gray-400 bg-gray-900" value="">
                    Select Skill
                  </option>
                  {skillData.map((skill, index) => {
                    return (
                      <option
                        className="w-full px-4 py-1 mt-1 border rounded-lg text-gray-400 bg-gray-900"
                        key={index}
                        value={skill}
                      >
                        {skill}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-300 font-medium">
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  className="w-full px-4 py-1 mt-1 border text-gray-400 border-gray-400 rounded-lg "
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-300 font-medium">
                  About
                </label>
                <textarea
                  type="text"
                  value={about}
                  className="w-full px-4 py-1 mt-1 border text-gray-400 border-gray-400  rounded-lg "
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
              </div>
              <p className="text-red-400 text-sm m-2">{error}</p>

              <button
                className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
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
