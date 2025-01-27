import { AxiosRequestConfig } from "axios";
import { algorithmMapping } from "../utils/general";

export interface IStatus {
  type: "sucess" | "server" | "client" | "unknown";
  data: any;
  status?: number;
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

export interface IFile {
  id: string;
  content: string;
  type: string;
  name: string;
}

export interface IShowData {
  id: string;
  content: string;
  type: string;
}

export interface IMetrics {
  time_taken: number;
  memory_usage: number;
  throughput: number;
}

export interface IDisplayDetails {
  data: IShowData;
  onClose: () => void;
  isDisabled: boolean;
}

export interface IEncTypes {
  onTypeSelect: (mode: string) => void;
  isDisabled: boolean;
  onClose: () => void;
}

export interface IShowMetrics {
  originalContent?: string;
  decryptedContent?: string;
  encryptedContent?: string;
  encryption_metrics?: IMetrics;
  decryption_metrics?: IMetrics;
}

export interface IMetricsObj {
  data: IShowMetrics;
  onClose: () => void;
  isDisabled: boolean;
}

export type AlgorithmShortForm = keyof typeof algorithmMapping;
