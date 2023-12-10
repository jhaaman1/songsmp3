import React, { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import { RxTrackPrevious } from "react-icons/rx";
import { RxTrackNext } from "react-icons/rx";
import { RiEqualFill } from "react-icons/ri";
import { SlControlPause } from "react-icons/sl";
import { FaMusic } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

const Player = ({
  songs,
  currentSongIndex,
  setCurrentSongIndex,
  playingSongIndex,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  console.log(songs);
  const currentSong =
    songs[playingSongIndex ? playingSongIndex : currentSongIndex];

  console.log("cureent", currentSong);
  useEffect(() => {
    if (songs.length > 0) {
      const currentSong = songs[currentSongIndex];
      const newSound = new Howl({
        src: currentSong.url,
        format: "mp3",
        onload: () => {
          console.log("Sound loaded successfully");
          setDuration(newSound?.duration());
        },
      });
      setSound(newSound);
    }
  }, [songs, currentSongIndex]);
  console.log("sound", sound);
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(sound.seek());
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    console.log("Toggling play");
    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      console.log("Trying to play");
      sound.play();
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    if (sound.playing()) {
      sound.stop();
      setIsPlaying(false);
    }

    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const handlePreviousSong = () => {
    if (sound.playing()) {
      sound.stop();
      setIsPlaying(false);
    }
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
  };

  const handleSeekChange = (event) => {
    setCurrentTime(event.target.value);
    sound.seek(event.target.value);
  };

  return (
    <div className="player">
      {songs?.length > 0 && (
        <div className="player-controls d-flex flex-column">
          <div>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-100"
            />
          </div>
          <div className="d-flex flex-row justify-content-between p-2">
            <div className="d-flex gap-2">
              <div>
                {" "}
                <img
                  src={`data:image/jpeg;base64, ${currentSong.image}`}
                  alt={currentSong.songName}
                  className="thumbnail-image thumbnail"
                />
              </div>
              <div className="mt-4">{currentSong?.songName}</div>
            </div>
            <div className="border-0 d-flex gap-2">
              <button className="border-0">
                <RxTrackPrevious onClick={handlePreviousSong} />
              </button>

              <button className="border-0" onClick={togglePlay}>
                {isPlaying ? <SlControlPause /> : <FaPlay />}
              </button>
              <button className="border-0">
                <RxTrackNext onClick={handleNextSong} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
