import React from "react";
import { IMetricsObj } from "../types/customTypes";
import { truncateString } from "../utils/general";

const ShowMetrics: React.FC<IMetricsObj> = ({ data, onClose, isDisabled }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Result</h3>
        <p>
          <strong>Original Content:</strong> {data?.originalContent}
        </p>
        <p>
          {data && data.decryptedContent && (
            <>
              <strong>Decrypted Content:</strong>{" "}
              {truncateString(data.decryptedContent, 20)}
            </>
          )}
          {data?.encryptedContent && (
            <>
              <strong>Encrypted Content:</strong>{" "}
              {truncateString(data?.encryptedContent, 20)}
            </>
          )}
        </p>
        {data?.encryption_metrics && (
          <>
            <h4>Encryption Metrics:</h4>
            <p>Time Taken: {data?.encryption_metrics?.time_taken}</p>
            <p>
              Memory Usage: {data?.encryption_metrics?.memory_usage}
              MB
            </p>
            <p>Throughput: {data?.encryption_metrics?.throughput}</p>
          </>
        )}
        {data?.decryption_metrics && (
          <>
            <h4>Decryption Metrics:</h4>
            <p>Time Taken: {data?.decryption_metrics?.time_taken}s</p>
            <p>
              Memory Usage: {data?.decryption_metrics?.memory_usage}
              MB
            </p>
            <p>Throughput: {data?.decryption_metrics?.throughput}</p>
          </>
        )}
        <button onClick={onClose} disabled={isDisabled}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowMetrics;
