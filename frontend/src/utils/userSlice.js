import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser: (state, action) => {
            return action.payload;
        }, 
        removeUser: (state, action) => {
            return null;
        }
    }
});

export const { addUser, removeUser } = userSlice.actions; // used in diff components for update the state
export default userSlice.reducer; // used in the redux store.

