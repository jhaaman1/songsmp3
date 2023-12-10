import React, { useState } from "react";
import { GoUpload } from "react-icons/go";
import Modal from "../ThumbnailLogic/Modal";
import UpdateThumbnail from "../ThumbnailLogic/UpdateThumbnail";

const AddSong = ({addSongToList }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [song, setSong] = useState([]);
  const [url, setURL] = useState([]);
  const [source, setSource] = useState([]);
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("No selected File");
  const [imageData, setImageData] = useState("");
  const [imageDataType, setImageDataType] = useState("");


  const handleAddSong = () => {
    if (song.trim() !== "") {
      // Create a new song object with the entered data
      const newSong = {
        songName: song,
        url: url,
        source: source,
        name: imageName,
        docBase: imageData,
        doctype: imageDataType,
      };

      // updateThumbnail([data])
      addSongToList([newSong]);

      // Clear the input fields
      setSong("");
      setURL("");
      setSource("");
      setImage("");
      setImageData("");
      setImageDataType("");
      
    }
  };

  console.log("song", song);

  return (
    <>
      <div
        class="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-black" id="exampleModalToggleLabel">
                Add Song
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="songNameInput" class="form-label">
                  Song Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="songNameInput"
                  placeholder="Song Name"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                />
                <label for="songLinkInput" class="form-label">
                  Song Link
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="songLinkInput"
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                  placeholder="URL"
                />
                <label for="sourceInput" class="form-label">
                  Song Source
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="sourceInput"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Source Name"
                />

                <div className="mt-4 border">
                  <GoUpload />
                  <UpdateThumbnail
                    setHandleName={setImageName}
                    setHandleDatatype={setImageDataType}
                    setHandleData={setImageData}
                    setHandleDoc={setImage}
                    handleDoc={image}
                    handleName={imageName}
                    handleData={imageData}
                    handleDataType={imageDataType}
                    handleAllowedTypes={[
                      "application/pdf",
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                    ]}
                    handleinput={".input-field"}
                    handleClass={"input-field"}
                    
                  />
                  {/* <Modal handleThumbnail={handleThumbnail}/> */}
                </div>
                {/* <div>contain image</div> */}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAddSong}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <a
        className="btn btn-warning"
        data-bs-toggle="modal"
        href="#exampleModalToggle"
        role="button"
      >
        Add Song
      </a>
    </>
  );
};

export default AddSong;
