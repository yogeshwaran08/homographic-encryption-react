import React from "react";
import { IEncTypes } from "../types/customTypes";

const EncTypes: React.FC<IEncTypes> = ({
  onTypeSelect,
  isDisabled,
  onClose,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Select Type Model</h3>
        <div className="button-grid">
          <button
            className="type-btn"
            onClick={() => onTypeSelect("mkhe")}
            disabled={isDisabled}
          >
            Multi Key encryption
          </button>
          <button
            className="type-btn"
            onClick={() => onTypeSelect("skhe")}
            disabled={isDisabled}
          >
            Single Key encryption
          </button>
          <button
            className="type-btn"
            onClick={() => onTypeSelect("fhe")}
            disabled={isDisabled}
          >
            Full Homomorphic encryption
          </button>
          <button
            className="type-btn"
            onClick={() => onTypeSelect("phe")}
            disabled={isDisabled}
          >
            Partial Homomorphic encryption
          </button>
        </div>
        <button onClick={onClose} className="close-btn" disabled={isDisabled}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EncTypes;
