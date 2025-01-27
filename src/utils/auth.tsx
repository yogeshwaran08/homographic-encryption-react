import { toast } from "react-toastify";
import { backend_url } from "../constant/backend";
import axios from "axios";
import { AuthOptions, IStatus } from "../types/customTypes";

export const login = async (username: string, password: string) => {
  try {
    const url = `${backend_url}/login`;
    const res = await axios.post(url, { username, password });
    return { type: "sucess", data: res.data } as IStatus;
  } catch (error) {
    toast.error("Error occured on login");
    console.log(error);
    return { type: "unknown", data: "Failed" } as IStatus;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const url = `${backend_url}/register`;
    const res = await axios.post(url, { username, password });
    return { type: "sucess", data: res.data } as IStatus;
  } catch (error) {
    toast.error("Error occured on registration");
    console.log(error);
    return { type: "unknown", data: "Failed" } as IStatus;
  }
};

export const auth = async ({
  token,
  method,
  url,
  data = {},
  options = {},
}: AuthOptions) => {
  try {
    const headers = options?.headers || {};
    delete options.headers;

    const res = await axios({
      method,
      url: `${backend_url}/${url}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
    });

    return { data: res.data, type: "sucess" } as IStatus;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || "Something went wrong!";
    console.log(errorMessage, "error cocured");
    toast.error(errorMessage);
    const status = { type: "unknown", data: errorMessage } as IStatus;
    console.log(err);
    if (err?.status) {
      status.status = err?.status;
    }
    return status;
  }
};
