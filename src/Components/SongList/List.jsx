import React, { useState } from "react";
import "./List.css";
import { AiOutlineAppstore, AiOutlineDash } from "react-icons/ai";
import AddSong from "./AddSong";
import Player from "./Player";
import { AiTwotoneDelete } from "react-icons/ai";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playingSongIndex, setPlayingSongIndex] = useState(null);
  const navigate = useNavigate();

  const handlePlaySong = (index) => {
    setCurrentSong(songs[index].url);
    setCurrentSongIndex(index);
    setPlayingSongIndex(index);
  };

  const handleAddSong = (data) => {
    console.log("data", data);
    setSongs([
      ...songs,
      ...data.map((item) => ({
        songName: item.songName,
        source: item.source,
        url: item.url,
        image: item.docBase,
      })),
    ]);
  };

  const handleDeleteSong = (index) => {
    const updatedSongs = [...songs];
    updatedSongs.splice(index, 1);
    setSongs(updatedSongs);
  };

  const handleLogout = () => {
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("requestId");
    navigate("/");
  };
  console.log("sog", songs);
  const date = new Date();

  return (
    <div className="container d-flex gap-2">
      <div className="box-1 w-25 h-100 ">
        <div className="border-bottom">
          <h2 className="logo">Logo</h2>
        </div>
        <div className="d-flex flex-column justify-content-between border h-75">
          <div className="mt-2 songs-nav">
            <AiOutlineAppstore />
            <span className="ml-2" role="button">
              Songs
            </span>
          </div>
          <div className="p-2" role="button" onClick={handleLogout}>
            <BiLogOutCircle /> Logout
          </div>
        </div>
      </div>
      <div className="box-2 w-75 h-100 d-flex flex-column">
        <nav className="navbar w-100 size">
          <h2>Songs</h2>
          <div className="add-right">
            <div>
              <AddSong addSongToList={handleAddSong} />
            </div>
            <button className="border-0 rounded">
              <AiOutlineDash />
            </button>
          </div>
        </nav>
        <div className="h-75 w-100 size">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Song Name</th>
                <th scope="col">Source</th>
                <th scope="col">Added On</th>
                <th scope="col">Play</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {songs?.map((song, index) => (
                <tr
                  key={index}
                  className={`
                  ${index === playingSongIndex ? "playing" : ""}
                `}
                >
                  <th scope="row" className="text-black d-flex">
                    {song.image && (
                      <td className="icon ">
                        <img
                          src={`data:image/jpeg;base64, ${song.image}`}
                          alt={song.songName}
                          className="thumbnail-image thumbnail"
                        />
                      </td>
                    )}{" "}
                    <div className="mt-3">{song.songName}</div>
                  </th>
                  <td className="pt-4">{song.source}</td>
                  <td className="pt-4">{date.toLocaleDateString()}</td>
                  <td className="icon " onClick={() => handlePlaySong(index)}>
                    <HiOutlinePlayCircle className="w-25 h-25 bg-warning rounded-circle mt-4">
                      {" "}
                      {song.url}
                    </HiOutlinePlayCircle>
                  </td>
                  <td className="icon">
                    <AiTwotoneDelete
                      className="w-25 h-25 mt-3"
                      onClick={() => handleDeleteSong(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-100 size">
          <Player
            songs={songs}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            playingSongIndex={playingSongIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
