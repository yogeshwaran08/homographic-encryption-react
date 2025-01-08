import React, { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import "../styles/Home.scss";
import useUserStore from "../store/userStore";
import { auth } from "../utils/auth";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useUserStore();
  const [files, setFiles] = useState<{ name: string; content: string }[]>([]);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [showType, setShowType] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [encryptionResult, setEncryptionResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the request

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      const fileContent = await uploadedFile.text();
      setFiles([...files, { name: uploadedFile.name, content: fileContent }]);
      setShowType(true); // Show model type selection
    }
  };

  const handleViewContent = (content: string) => {
    setModalContent(content);
  };

  const handleCloseModal = () => {
    setShowType(false);
    setModalContent(null);
    setEncryptionResult(null);
  };

  const handleSelectModel = (model: string) => {
    setSelectedModel(model); // Set the selected model

    toast.promise(handleEncrypt(model), {
      pending: "Encrypting data",
      success: "Encrypted",
      error: "Error occred on encryption",
    });
  };

  const handleEncrypt = async (model: string) => {
    console.log(model);
    if (user?.access_token) {
      const url = `user/uploads`;
      const data = {
        content: files[files.length - 1]?.content || "", // Use the last uploaded file content
      };

      setLoading(true); // Set loading state to true when the request starts

      try {
        const res = await auth({
          method: "POST",
          token: user?.access_token,
          url: url,
          data,
        });

        setEncryptionResult(res.data);
      } catch (error) {
        console.error("Error encrypting the data:", error);
      } finally {
        setLoading(false); // Set loading state to false when the request finishes
      }
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      setShowType(true); // Show model type selection when a file is uploaded
    }
  }, [files]);

  useEffect(() => {
    console.log("encryption", encryptionResult);
  }, [encryptionResult]);

  return (
    <div className="home-screen">
      <div className="header">
        <h3>Hi {user?.username || "User"}</h3>
        <div className="upload-container">
          <button
            className="upload-btn"
            disabled={loading} // Disable the button if loading
          >
            Upload .txt file
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="file-input"
              disabled={loading} // Disable the input if loading
            />
          </button>
        </div>
      </div>
      <div className="file-list">
        <h3>Uploaded Contents</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index} className="file-item">
              <div className="file-preview">
                <FaFileAlt className="file-icon" />{" "}
                {file.content.length > 80
                  ? `${file.content.slice(0, 80)}...`
                  : file.content}
              </div>
              <button
                className={`view-btn ${loading ? "disabled" : null}`}
                onClick={() => handleViewContent(file.content)}
                disabled={loading}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>

      {modalContent && (
        <div className="modal">
          <div className="modal-content">
            <textarea readOnly value={modalContent}></textarea>
            <button
              onClick={handleCloseModal}
              disabled={loading} // Disable the button if loading
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showType && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select Type Model</h3>
            <div className="button-grid">
              <button
                className="type-btn"
                onClick={() => handleSelectModel("Multi Key")}
                disabled={loading} // Disable the button if loading
              >
                Multi Key
              </button>
              <button
                className="type-btn"
                onClick={() => handleSelectModel("Single Key")}
                disabled={loading} // Disable the button if loading
              >
                Single Key
              </button>
              <button
                className="type-btn"
                onClick={() => handleSelectModel("Another Option")}
                disabled={loading} // Disable the button if loading
              >
                Another Option
              </button>
              <button
                className="type-btn"
                onClick={() => handleSelectModel("Final Option")}
                disabled={loading} // Disable the button if loading
              >
                Final Option
              </button>
            </div>
            <button
              onClick={handleCloseModal}
              className="close-btn"
              disabled={loading} // Disable the button if loading
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {encryptionResult && (
        <div className="modal">
          <div className="modal-content">
            <h3>Encryption/Decryption Result</h3>
            <p>
              <strong>Original Content:</strong>{" "}
              {files[files.length - 1]?.content}
            </p>
            <p>
              <strong>Decrypted Content:</strong>{" "}
              {encryptionResult.decrypted_content}
            </p>
            <h4>Encryption Metrics:</h4>
            <p>
              Time Taken: {encryptionResult?.encryption_metrics?.time_taken}
            </p>
            <p>
              Memory Usage: {encryptionResult?.encryption_metrics?.memory_usage}
              MB
            </p>
            <p>
              Throughput: {encryptionResult?.encryption_metrics?.throughput}
            </p>
            <h4>Decryption Metrics:</h4>
            <p>
              Time Taken: {encryptionResult?.decryption_metrics?.time_taken}s
            </p>
            <p>
              Memory Usage: {encryptionResult?.decryption_metrics?.memory_usage}
              MB
            </p>
            <p>
              Throughput: {encryptionResult?.decryption_metrics?.throughput}
            </p>
            <button
              onClick={handleCloseModal}
              disabled={loading} // Disable the button if loading
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
