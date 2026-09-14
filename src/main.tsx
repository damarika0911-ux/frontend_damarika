import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion } from "framer-motion";
import ErrorBoundary from "./error/ErrorBoundary.tsx";
import { ToastContainer } from "react-toastify";
import { warmUpApi } from "./service/apiService";

import "./index.css";
import "./App.css";
import "./utils/imageFallback";

const lazyAnimationFeatures = () =>
  import("./utils/framer.ts").then((res) => res.default);

// Start waking the backend while React renders; data requests share this check.
// Screens handle request failures, so startup itself must not reject unhandled.
void warmUpApi().catch(() => {});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LazyMotion strict features={lazyAnimationFeatures}>
      <ErrorBoundary>
        <App />
        <ToastContainer pauseOnFocusLoss={false} />
      </ErrorBoundary>
    </LazyMotion>
  </BrowserRouter>
);
