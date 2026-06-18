import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./components/App";

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<p>Un moment...</p>}>
      <App />
  </Suspense>,
);
