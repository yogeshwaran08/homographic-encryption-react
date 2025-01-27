import { IStatus, IUser } from "../types/customTypes";
import { auth } from "./auth";

export const fetchFiles = async (user: IUser | null) => {
  const url = `user/my-files`;
  const res = await auth({
    method: "GET",
    url: url,
    token: user?.access_token || null,
  });
  if (res.type == "sucess") {
    return { data: res.data?.files, type: "sucess" } as IStatus;
  }
  console.log();
  return { data: "failed", type: "unknown" } as IStatus;
};
