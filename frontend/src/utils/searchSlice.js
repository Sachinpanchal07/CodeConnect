import { createSlice } from "@reduxjs/toolkit";

const searchUserSlice = createSlice({
    name: "searchUser",
    initialState: [],
    reducers:{
        addSearchUser : (state, action) =>  action.payload,
        removeSearchUser : (state, action) => {
            const newState = state.filter((user) => user._id !== action.payload);
            return newState;
        }
    }
});

export const {addSearchUser, removeSearchUser} = searchUserSlice.actions;
export default searchUserSlice.reducer;