import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests , removeRequest} from '../utils/requestsSlice'
import RequestCard from './RequestCard'
import {toast} from 'react-toastify';

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests)

    // accept or reject req
    const reviewRequest =  async (status,_id) => {
        try{
            // console.log(status+_id)
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id, {}, {withCredentials:true});
            dispatch(removeRequest(_id));
            toast.success("Connection request " + status + " successfully");

        }catch(err){
            console.error(err);
        }
    }

    // fetch all requests
    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
            dispatch(addRequests(res.data.connectionRequests));
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[]);

    if(!requests)return;
    if(requests.length === 0){
        return (<p className="mt-10 flex justify-center text-xl">No Connections Requests Found</p>)
    }

  return (
    <div className='flex flex-wrap justify-evenly flex-start'>
      {
        requests.map((request,index)=>{
            return (
                <RequestCard key={index} request={request.fromUserId} reviewRequest={reviewRequest} requestId={request._id}></RequestCard>
            )
        })
      }
    </div>
  )
}

export default Requests
