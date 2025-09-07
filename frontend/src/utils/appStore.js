import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestsSlice";
import allRequestsReducer from "./allRequestsSlice";
import serachReducer from "./searchSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer,
        allRequestsSlice: allRequestsReducer,
        searchUser:serachReducer,
    }
})

export default appStore;