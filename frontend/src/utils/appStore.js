import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestsSlice";
import allRequestsReducer from "./allRequestsSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer,
        allRequestsSlice: allRequestsReducer,
    }
})

export default appStore;