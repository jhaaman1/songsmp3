import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import OTPVerifcation from "../OTP/OTPVerifcation";
import AddSong from "../SongList/AddSong";
import List from "../SongList/List";
import Player from "../SongList/Player";

const AllRoutes = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OTPVerifcation />} />
        <Route
          path="/addsong"
          element={<AddSong songs={songs} setSongs={setSongs} />}
        />
        <Route path="/listSong" element={<List />} />
        <Route path="/player" element={<Player currentSong={currentSong} />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
