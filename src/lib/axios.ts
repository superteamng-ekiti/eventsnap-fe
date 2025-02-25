/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "@/constant";

const BASE_URL = API_URL;

class AxiosService {
  private static instance: AxiosService;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public readonly axiosInstance;

  public static getInstance(): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService();
    }
    return AxiosService.instance;
  }
}

// Create the service instance
const axiosService = AxiosService.getInstance();
export const axiosInstance = axiosService.axiosInstance;

// API request functions
export const api = {
  get: <T>(url: string) =>
    axiosInstance.get<T>(url).then((response) => response.data),

  post: <T>(url: string, data: any, config?: any) =>
    axiosInstance.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data: any) =>
    axiosInstance.put<T>(url, data).then((response) => response.data),

  delete: <T>(url: string) =>
    axiosInstance.delete<T>(url).then((response) => response.data),
};
