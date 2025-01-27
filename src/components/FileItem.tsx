import { FaFileAlt } from "react-icons/fa";
import { IFile } from "../types/customTypes";
import React from "react";

interface IFileItem {
  file: IFile;
  isDisabled: boolean;
  onOpen: (file: IFile) => void;
}

const FileItem: React.FC<IFileItem> = ({ file, isDisabled, onOpen }) => {
  return (
    <li className="file-item">
      <div className="file-preview">
        <FaFileAlt className="file-icon" /> {file.name}
      </div>
      <button
        className={`view-btn ${isDisabled ? "disabled" : null}`}
        onClick={() => onOpen(file)}
        disabled={isDisabled}
      >
        View
      </button>
    </li>
  );
};

export default FileItem;
