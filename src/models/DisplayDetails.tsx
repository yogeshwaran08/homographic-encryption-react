import React, { useState } from "react";
import { IDisplayDetails } from "../types/customTypes";
import { expandName } from "../utils/general";
import { auth } from "../utils/auth";
import useUserStore from "../store/userStore";
import { toast } from "react-toastify";

const DisplayDetails: React.FC<IDisplayDetails> = ({
  data,
  isDisabled,
  onClose,
}) => {
  const [decrypted, setDecrypted] = useState<string>();
  const [disableDec, setDisableDec] = useState(false);
  const user = useUserStore();

  const decryptData = async () => {
    setDisableDec(true);
    const url = `user/mode/${data?.type}/${data?.id}`;
    const res = await auth({
      url,
      token: user?.user?.access_token || null,
      method: "GET",
    });

    if (res.type == "sucess") {
      setDecrypted(res.data?.data);
    } else {
      throw Error("Error");
    }
    setDisableDec(false);
  };

  const loadOnDecrypt = () => {
    toast.promise(decryptData(), {
      pending: "Decrypting data",
      success: "Decrypted",
      error: "Error occred on decryption",
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <p>Type: {expandName(data.type as any)}</p>
        </div>
        <textarea readOnly value={data.content}></textarea>
        <textarea
          readOnly
          value={decrypted}
          placeholder="decrypted data..."
        ></textarea>
        <div className="btns">
          <button onClick={loadOnDecrypt} disabled={disableDec}>
            Decrypt
          </button>
          <button onClick={onClose} disabled={isDisabled}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayDetails;
