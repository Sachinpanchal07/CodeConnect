import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers:{
        addConnections : (state, action) => action.payload,
        // removeConnections : () => null
        removeConnections: (state, action) => {
            const newArray = state.filter((request) => request._id !== action.payload);
            return newArray;
        }
    }
});

export const {addConnections, removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;