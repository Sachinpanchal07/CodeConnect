import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action)=> action.payload,
        removeUserFromFeed: (state, action) => {
            const newArray = state.filter((request) => request._id !== action.payload);
            return newArray;
        }
    },
});

export const {addFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;