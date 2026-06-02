import { FiCamera, FiX, FiEdit2 } from "react-icons/fi";

import "../../styles/assessmentcrop.css";

export default function UploadPreview({ previewImage, onUpload, onRemove }) {
  return (
    <div className="profile-upload-wrapper">
      <div className="profile-upload">
        {previewImage ? (
          <div className="preview-wrapper">
            <img src={previewImage} alt="Preview" className="preview-image" />

            <button
              type="button"
              className="remove-image-btn"
              onClick={onRemove}
            >
              <FiX />
            </button>

            <label className="edit-photo-btn">
              <FiEdit2 />

              <input type="file" accept="image/*" hidden onChange={onUpload} />
            </label>
          </div>
        ) : (
          <label className="upload-label">
            <FiCamera className="camera-icon" />

            <input type="file" accept="image/*" hidden onChange={onUpload} />
          </label>
        )}
      </div>

      <p className="upload-info">
        PNG, JPG or JPEG
        <br />
        Max size: 2MB
      </p>
    </div>
  );
}
