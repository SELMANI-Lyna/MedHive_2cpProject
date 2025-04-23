import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Ensure correct import
import "./index.css"; // ✅ Ensure CSS is loaded
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
