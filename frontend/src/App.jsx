import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/requests";
import { ToastContainer } from 'react-toastify';
import SearchUsers from "./components/SearchUsers";
import OtpVerify from "./components/OtpVerify";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body></Body>}>
            <Route path="/" element={<Feed></Feed>}></Route>
            <Route path="/login" element={<Login></Login>}></Route> 
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/connections" element={<Connections></Connections>}></Route>
            <Route path="/requests" element={<Requests></Requests>}></Route>
            <Route path="/Search" element={<SearchUsers></SearchUsers>}></Route>
            <Route path="/verify-otp" element={<OtpVerify></OtpVerify>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>  
    </Provider>   
    <ToastContainer />  
    </>
  );
}

export default App;
