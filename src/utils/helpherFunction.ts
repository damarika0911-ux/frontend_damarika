import { ApiError } from "../service/http";
import { toast } from "react-toastify";
export function handleApiError(err: unknown, handleNotFound = false) {
  if (handleNotFound && err instanceof ApiError && err.status === 404) return true;
  toast.error(err instanceof Error ? err.message : "Unexpected error occurred");
}
