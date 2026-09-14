import { DAMARIKA_API_HOST, parseImageUrl } from "../utils/config";
import { createApiReadiness } from "./apiReadiness";
import { fetchJson } from "./http";
import type { Program, Product } from "../store/appStore";
import type { TeamMember } from "../store/localStore";

const readiness = createApiReadiness(async () => {
  try {
    const url = new URL("/health", new URL(DAMARIKA_API_HOST, window.location.origin));
    url.searchParams.set("_", String(Date.now()));
    const response = await fetchJson<{ success: boolean; database: string }>(url.href, {}, 90000);
    if (response.success !== true || response.database !== "ready") throw new Error("API is not ready");
  } catch {
    throw new Error("Unable to connect right now. Please try again shortly.");
  }
});
export const warmUpApi = readiness.waitUntilReady;
interface ApiResponse<T> { success: boolean; message: string; data: T }

async function request<T>(path: string, method = "POST", body?: unknown): Promise<ApiResponse<T>> {
  await warmUpApi();
  const response = await fetchJson<ApiResponse<T>>(DAMARIKA_API_HOST + path, {
    method,
    ...(body === undefined ? {} : { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }),
  });
  readiness.markActivity();
  if (response.success !== true) throw new Error(response.message || "Unable to load data");
  if (Array.isArray(response.data)) {
    response.data = response.data.map((item) =>
      item && typeof item === "object" && "image" in item
        ? { ...item, image: parseImageUrl(item.image) } : item,
    ) as T;
  }
  return response;
}
export const getPrograms = () => request<Program[]>("/program");
export const getProducts = () => request<Product[]>("/product");
export const getPeopleData = () => request<TeamMember[]>("/people");
export const getArchaeologicalSites = () => request<any[]>("/archeologist");
export const getDistrictData = () => request<any[]>("/district");
export const getCountdown = () => request<unknown>("/countdown", "GET");
export const postContactForm = (body: {
  firstName: string; lastName: string; email: string; subject: string; message: string;
}) => request<unknown>("/contact/form", "POST", body);
