export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchJson<T>(url: string, init: RequestInit = {}, timeout = 15000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new ApiError(body?.message || `Request failed (${response.status})`, response.status);
    if (body === null) throw new ApiError("The server returned an invalid response. Please try again.", response.status);
    return body as T;
  } catch (error) {
    if (controller.signal.aborted) throw new ApiError("The request timed out. Please try again.", 408);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
