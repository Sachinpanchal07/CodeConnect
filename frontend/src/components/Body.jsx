import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useNavigate, Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { addInAllRequests } from '../utils/allRequestsSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookie = document.cookie;

  // User data on first render
  const fetchUser = async ()=>{ 
    try{
      const res = await axios.get(BASE_URL + "/profile/view", {withCredentials:true});
      dispatch(addUser(res?.data));
    }catch(err){
      if(err.response?.status === 401){ // token not found(401)
        navigate("/login");
      }
    }
  };

  // fetch all connection requests on first render
  const fetchConnectionRequests = async () => {
    try{
      const res = await axios.get(BASE_URL + "/request/all", {withCredentials:true});
      dispatch(addInAllRequests(res?.data?.data));
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if(cookie){
      fetchUser();
      fetchConnectionRequests();
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Body;
