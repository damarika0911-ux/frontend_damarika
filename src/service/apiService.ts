import { env } from "../utils/env";
import { DAMARIKA_API_HOST, parseImageUrl } from "../utils/config";
import { createApiReadiness } from "./apiReadiness";
import { fetchJson } from "./http";
import type { Program, Product } from "../store/appStore";
import type { TeamMember } from "../store/localStore";

/** Free Render instances sleep; the first request after a sleep can take up to ~60s. */
const COLD_START_TIMEOUT = 90000;
const NORMAL_TIMEOUT = 15000;
const IDLE_BEFORE_COLD = 14 * 60 * 1000;
let lastSuccess = 0;
const requestTimeout = () => (Date.now() - lastSuccess < IDLE_BEFORE_COLD ? NORMAL_TIMEOUT : COLD_START_TIMEOUT);

// Startup ping: wakes a sleeping backend while the page renders.
// Data requests no longer wait for it (that cost a full extra round trip on every visit);
// they run in parallel and simply allow a longer timeout until the API has answered once.
const readiness = createApiReadiness(async () => {
  try {
    const url = new URL("/health", new URL(DAMARIKA_API_HOST, window.location.origin));
    const response = await fetchJson<{ success: boolean; database: string }>(url.href, {}, COLD_START_TIMEOUT);
    if (response.success !== true || response.database !== "ready") throw new Error("API is not ready");
    lastSuccess = Date.now();
  } catch {
    throw new Error("Unable to connect right now. Please try again shortly.");
  }
});
export const warmUpApi = readiness.waitUntilReady;

export interface PageMeta {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextOffset: number | null;
}
interface ApiResponse<T> { success: boolean; message: string; data: T; meta?: PageMeta }
export interface Page<T> { items: T[]; meta: PageMeta }

const withImages = <T,>(data: T): T =>
  (Array.isArray(data)
    ? data.map((item) => (item && typeof item === "object" && "image" in item ? { ...item, image: parseImageUrl(item.image) } : item))
    : data && typeof data === "object" && "image" in data
      ? { ...data, image: parseImageUrl((data as { image: unknown }).image) }
      : data) as T;

async function request<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetchJson<ApiResponse<T>>(DAMARIKA_API_HOST + path, init, requestTimeout());
  lastSuccess = Date.now();
  readiness.markActivity();
  if (response.success !== true) throw new Error(response.message || "Unable to load data");
  response.data = withImages(response.data);
  return response;
}

/** GET a paginated list. GET (not POST) lets the browser cache it and skips CORS preflight. */
async function getPage<T>(resource: string, params: { limit: number; offset?: number; q?: string }): Promise<Page<T>> {
  const qs = new URLSearchParams({ limit: String(params.limit), offset: String(params.offset ?? 0) });
  if (params.q) qs.set("q", params.q);
  const res = await request<T[]>(`/${resource}?${qs}`);
  const items = Array.isArray(res.data) ? res.data : [];
  const meta = res.meta ?? { total: items.length, limit: params.limit, offset: params.offset ?? 0, hasMore: false, nextOffset: null };
  return { items, meta };
}

/** Items per page for infinite scroll (override with VITE_PAGE_SIZE at build time). */
export const PAGE_SIZE = Math.min(Math.max(Number(env.VITE_PAGE_SIZE) || 10, 1), 50);

export const getProgramsPage = (offset = 0, limit = PAGE_SIZE, q?: string) => getPage<Program>("program", { limit, offset, q });
export const getProductsPage = (offset = 0, limit = PAGE_SIZE, q?: string) => getPage<Product>("product", { limit, offset, q });
export const getPeoplePage = (offset = 0, limit = PAGE_SIZE) => getPage<TeamMember>("people", { limit, offset });
export const getProgram = async (id: number) => (await request<Program>(`/program/${id}`)).data;
// The map draws every marker at once, so it asks for the full set in one page.
export const getArchaeologicalSites = async () => (await getPage<any>("archeologist", { limit: 200 })).items;
export const getDistrictData = async () => (await getPage<any>("district", { limit: 100 })).items;
export const getCountdown = async () => (await request<unknown>("/countdown")).data;

export const postContactForm = (body: {
  firstName: string; lastName: string; email: string; subject: string; message: string; website?: string;
}) => request<unknown>("/contact/form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
