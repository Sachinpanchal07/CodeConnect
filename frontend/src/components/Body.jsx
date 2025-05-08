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

  // fetch user data on first render
  const fetchUser = async ()=>{ // if user is loggedIn then go furthur else redirected to login page.
    try{
      const res = await axios.get(BASE_URL + "/profile/view",{withCredentials:true});
      dispatch(addUser(res.data));
    }catch(err){
      if(err.status === 401){
        navigate("/login")
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
    <div clasName='flex flex-col min-h-screen'>
      <NavBar clasName='fixed top-0 left-0 right-0 z-50'></NavBar>
      <main className='flex-grow overflow-auto'>
        <Outlet></Outlet>
      </main>
      <Footer clasName='fixed top-0 left-0 right-0 z-50'></Footer>
    </div>
  )
}

export default Body
