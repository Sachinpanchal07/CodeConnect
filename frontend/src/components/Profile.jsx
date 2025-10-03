import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="pt-20 pb-10 w-full min-h-screen bg-gray-950/50">
        <div className="">
          <h2 className="pb-8 font-bold text-2xl md:text-3xl text-center text-gray-300">Your Developer Profile</h2>
          <EditProfile user={user}></EditProfile>
        </div>
      </div>
    )
  );
};

export default Profile;
