import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import UserCard from "./UserCard";
import { addSearchUser } from "../utils/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchUsers = () => {

  const [searchedSkill, setsearchedSkill] = useState("");
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((store => store.searchUser))

  const getUsers = async () => {
    try{
      const cookie = document.cookie;
      if(cookie){ // check cookie

        if(searchedSkill == ""){
          toast.error("Please enter a valid skill !!")
          dispatch(addSearchUser([]));
           return
        };
        const res = await axios.post(BASE_URL+"/user/search", {searchedSkill}, {withCredentials:true});
        const data = res?.data?.data;

        if(data.length  >= 0){
          dispatch(addSearchUser(data));
        }
        if (data.length == 0){
          toast.error("Match not found");
        }
      }
      else{
        navigate("/login");
      }
    }catch(err){
      console.log(err);
      toast.error("Something went wrong");
    }
  };

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

      <div className="flex justify-evenly flex-wrap">
        { 
          users.map((user, index)=> (
            <UserCard key={index} user={user}></UserCard> // rendering user card.
          )) 
        }
      </div>
    </div>
  );
};

export default SearchUsers;
