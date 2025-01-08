import { AxiosRequestConfig } from "axios";

export interface IStatus {
  type: "sucess" | "server" | "client" | "unknown";
  data: any;
}

export interface IUser {
  id: number;
  username: string;
  access_token: string;
}

export interface AuthOptions {
  token: string | null;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: Record<string, any>;
  options?: AxiosRequestConfig;
}
