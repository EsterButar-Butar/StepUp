import "../../styles/assessmentcrop.css";

import { FiZoomIn, FiZoomOut } from "react-icons/fi";

export default function CropControls({ zoom, setZoom, onCancel, onSave }) {
  return (
    <div className="crop-controls">
      <div className="zoom-control">
        <FiZoomOut />

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />

        <FiZoomIn />
      </div>

      <div className="crop-actions">
        <button type="button" className="crop-cancel-btn" onClick={onCancel}>
          Cancel
        </button>

        <button type="button" className="crop-save-btn" onClick={onSave}>
          Save Photo
        </button>
      </div>
    </div>
  );
}
