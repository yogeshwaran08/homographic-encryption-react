import React, { useEffect, useState } from "react";
import "../styles/Home.scss";
import useUserStore from "../store/userStore";
import { auth } from "../utils/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchFiles } from "../utils/homeUtils";
import { IFile } from "../types/customTypes";
import EncTypes from "../models/EncTypes";
import ShowMetrics from "../models/ShowMetrics";
import DisplayDetails from "../models/DisplayDetails";
import FileItem from "../components/FileItem";

const Home = () => {
  const { user } = useUserStore();
  const [files, setFiles] = useState<IFile[]>([]);
  const [fileContent, setFileContent] = useState<IFile | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [contentToEnc, setContentToEnc] = useState<any>();

  const [showAlgo, setShowAlgo] = useState(false);

  const navigate = useNavigate();
  const { logout } = useUserStore();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      const fileContent = await uploadedFile.text();
      setContentToEnc({ name: uploadedFile.name, content: fileContent });
      setShowAlgo(true);
      event.target.value = "";
    }
  };

  const handleAlgoSelect = (model: string) => {
    toast.promise(handleEncrypt(model), {
      pending: "Encrypting data",
      success: "Encrypted",
      error: "Error occred on encryption",
    });
  };

  const handleEncrypt = async (model: string) => {
    if (user?.access_token) {
      const url = `user/mode/${model}`;
      const data = {
        content: contentToEnc?.content || "",
        filename: contentToEnc?.name || "new_file",
      };
      setLoading(true);

      const res = await auth({
        method: "POST",
        token: user?.access_token,
        url: url,
        data,
      });
      setShowAlgo(false);
      setLoading(false);
      if (res.type == "sucess") {
        setFiles((prev) => [...prev, ...(res.data?.files || [])]);
        setMetrics(res.data?.metrics);
      } else {
        throw Error("Response error");
      }
    } else {
      toast.warning("Token error");
      throw Error("Token error");
    }
  };

  const handleFetchFiles = async () => {
    const res = await fetchFiles(user);
    if (res.type == "sucess") {
      setFiles(res.data);
    }
  };

  useEffect(() => {
    if (user) {
      handleFetchFiles();
    }
  }, [user]);

  const handleViewContent = (data: IFile) => {
    setFileContent(data);
  };

  const handleCloseViewContent = () => {
    setFileContent(null);
  };

  const handleAlgoModelClose = () => {
    setShowAlgo(false);
  };

  const handleMetricsClose = () => {
    setMetrics(null);
  };

  return (
    <div className="home-screen">
      <div className="header">
        <h3>Hi {user?.username || "User"}</h3>
        <div className="upload-container">
          <button className="logout-btn btn" onClick={() => logout(navigate)}>
            Log out
          </button>
          <button className="upload-btn btn" disabled={loading}>
            Upload .txt file
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="file-input"
              disabled={loading}
            />
          </button>
        </div>
      </div>
      <div className="file-list">
        <h3>Uploaded Contents</h3>
        <ul>
          {files.map((file, index) => (
            <FileItem
              key={index}
              file={file}
              isDisabled={loading}
              onOpen={(data) => handleViewContent(data)}
            />
          ))}
        </ul>
      </div>

      {fileContent && (
        <DisplayDetails
          data={fileContent}
          onClose={handleCloseViewContent}
          isDisabled={loading}
        />
      )}

      {showAlgo && (
        <EncTypes
          isDisabled={loading}
          onTypeSelect={handleAlgoSelect}
          onClose={handleAlgoModelClose}
        />
      )}

      {metrics && (
        <ShowMetrics
          onClose={handleMetricsClose}
          isDisabled={loading}
          data={metrics}
        />
      )}
    </div>
  );
};

export default Home;
