// src/App.tsx
import PharmacistButton from "./Pages/PharmacistButton"; // Fix path
import AdminDashboard from "./Pages/AdminDashboard"; // Fix path
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/pharmacists" element={<PharmacistButton />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;