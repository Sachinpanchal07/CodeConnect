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
  const isPremium = user.isPremium;

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

      console.log(res)
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
  <div className="min-h-screen bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-950 to-gray-950 pt-28 pb-10 px-4">
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 items-start justify-center">
      
      {/* Form Container */}
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-white tracking-tight">Edit Profile</h2>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Personalize your developer presence</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">First Name</label>
              <input
                type="text"
                value={firstName}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Age</label>
              <input
                type="number"
                value={age}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Gender</label>
              <select
                value={gender}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all appearance-none"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" className="bg-gray-900">Select</option>
                <option value="Male" className="bg-gray-900">Male</option>
                <option value="Female" className="bg-gray-900">Female</option>
                <option value="Other" className="bg-gray-900">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Add Skills</label>
            <select
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all appearance-none"
              onChange={(e) => e.target.value && setSkills((prev)=>[...new Set([...prev, e.target.value])])}
            >
              <option value="" className="bg-gray-900">Choose a skill...</option>
              {skillData.map((skill, index) => (
                <option key={index} value={skill} className="bg-gray-900">{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">About</label>
            <textarea
              rows="3"
              value={about}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-tight ml-1">{error}</p>}

          <button
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 mt-2"
            type="button"
            onClick={saveProfile}
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="w-full lg:sticky lg:top-28">
        <p className="text-center text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Live Preview</p>
        <EditProfileCard
          user={{ firstName, lastName, photoUrl, age, gender, about, skills, isPremium }}
        />
      </div>

    </div>
  </div>
);
};

export default EditProfile;
