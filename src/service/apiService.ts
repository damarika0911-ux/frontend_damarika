import axios from "axios";
import { DAMARIKA_API_HOST, parseImageUrl } from "../utils/config";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

const api = axios.create({
  baseURL: DAMARIKA_API_HOST,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor — extract data, clean image URLs, handle errors
api.interceptors.response.use(
  (response) => {
    const body = response.data;
    // Clean image fields in array responses
    if (body?.data && Array.isArray(body.data)) {
      body.data = body.data.map((item: any) =>
        item && typeof item === "object" && "image" in item
          ? { ...item, image: parseImageUrl(item.image) }
          : item
      );
    }
    return body;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

const post = <T = any>(url: string, body?: any): Promise<ApiResponse<T>> =>
  api.post(url, body) as any;

const get = <T = any>(url: string): Promise<ApiResponse<T>> =>
  api.get(url) as any;

export const getPrograms = () => post("/program");

export const getProducts = () => post("/product");

export const postContactForm = (body: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) => post("/contact/form", body);

export const getArchaeologicalSites = () => post("/archeologist");

export const getPeopleData = () => post("/people");

export const getDistrictData = () => post("/district");

export const getCountdown = () => get("/countdown");
