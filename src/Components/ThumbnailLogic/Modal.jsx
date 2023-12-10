import React, { useState } from "react";
import UpdateThumbnail from "./UpdateThumbnail";
// import { toast } from "react-toastify";

const Modal = ({updateThumbnail}) => {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("No selected File");
  const [imageData, setImageData] = useState("");
  const [imageDataType, setImageDataType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const data = {
      name: imageName,
      docBase: imageData,
      doctype: imageDataType,
    };
    
    updateThumbnail([data])
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleImageChange}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <a
        className="btn"
        data-bs-toggle="modal"
        href="#exampleModalCenter"
        role="button"
      >
        Click to Upload Profile Thumbnail
      </a>
    </div>
  );
};

export default Modal;
