import { createSlice } from "@reduxjs/toolkit";

const allRequestsSlice = createSlice({
    name:"allRequests",
    initialState:null,
    reducers:{
        addInAllRequests:(state, action) => action.payload,
        
        removeFromRequests:(state, action) => {
            const newArray = state.filter((request) => {
                // console.log(typeof(request._id) + "  " + typeof(action.payload));
                return request._id != action.payload
            });
            return newArray;
        }
    }
});

export const {addInAllRequests, removeFromRequests} = allRequestsSlice.actions;
export default allRequestsSlice.reducer;