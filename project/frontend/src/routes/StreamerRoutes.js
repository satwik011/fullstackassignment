import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Streamers from "../components/Streamers";
import Login from "../components/Login";
import Admin from "../components/Admin";

const StreamerRoutes = () => {
  const { apiStatus, role } = useSelector((state) => state);
  console.log(apiStatus);
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {apiStatus == "success" && role == "user" && (
              <Route exact path="/streamers" element={<Streamers />} />
            )}
            {apiStatus == "success" && role == "admin" && (
              <Route exact path="/admin" element={<Admin />} />
            )}
            <Route exact path="/" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default StreamerRoutes;
