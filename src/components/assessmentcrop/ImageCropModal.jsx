// src/components/assessment/ImageCropModal.jsx

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { FiX, FiZoomIn, FiZoomOut } from "react-icons/fi";
import CropControls from "./CropControls";
import "../../styles/assessmentcrop.css";

export default function ImageCropModal({ image, onClose, onSave }) {
  // CROP STATES
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // HANDLE CROP COMPLETE
  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // CREATE CROPPED IMAGE
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener("load", () => resolve(image));

      image.addEventListener("error", (error) => reject(error));

      image.src = url;
    });

  // GET CROPPED IMAGE
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const maxAvatarSize = 512;
    const scale = Math.min(1, maxAvatarSize / pixelCrop.width);
    const outputWidth = Math.round(pixelCrop.width * scale);
    const outputHeight = Math.round(pixelCrop.height * scale);

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputWidth,
      outputHeight,
    );

    return canvas.toDataURL("image/jpeg", 0.9);
  };

  // HANDLE SAVE
  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);

      onSave(croppedImage);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="crop-modal-overlay">
      {/* MODAL */}
      <div className="crop-modal">
        {/* HEADER */}
        <div className="crop-header">
          <h2>Adjust Profile Photo</h2>

          <button className="crop-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* CROP AREA */}
        <div className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <CropControls
          zoom={zoom}
          setZoom={setZoom}
          onCancel={onClose}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
