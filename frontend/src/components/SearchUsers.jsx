import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const SearchUsers = () => {

  const [searchedSkill, setsearchedSkill] = useState("");

  const getUsers = async () => {
    const users = await axios.post(BASE_URL+"/user/search",{searchedSkill}, {withCredentials:true});
    console.log(users);
    setsearchedSkill("")
  };
  // console.log(searchedSkill);

  return (
    <div className="flex flex-col px-4 items-center">
      <h2 className="my-5 text-xl">Search user by entring skill</h2>
      <input
        value={searchedSkill}
        onChange={(e)=> setsearchedSkill(e.target.value)}
        id="search"
        placeholder="Enter skill"
        className="w-full max-w-md px-2 py-1 mx-2 rounded-sm"
      ></input>
      <div>
      <button
       onClick={getUsers}
       className="bg-blue-500 px-2 py-1 rounded-sm m-5 text-white hover:bg-blue-400 cursor-pointer">Serach</button>
      </div>
    </div>
  );
};

export default SearchUsers;
