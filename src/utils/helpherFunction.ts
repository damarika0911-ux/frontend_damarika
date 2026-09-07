import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function handleApiError(err: any, handleNotFound = false) {
  console.error(err);
  if (err instanceof AxiosError) {
    if (handleNotFound) {
      if (err.response?.status === 404) {
        return true;
      }
      toast.error(err.response?.data?.message || "Something went wrong");
    } else {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  } else {
    toast.error("Unexpected error occurred");
  }
}
