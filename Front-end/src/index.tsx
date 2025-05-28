import React from "react";
 import ReactDOM from "react-dom/client"; // ✅ Ensure correct import
// import "./index.css"; // Uncomment and replace with the correct CSS file path if needed
 import App from "./App";
 
 ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
     <App />
   </React.StrictMode>
 );