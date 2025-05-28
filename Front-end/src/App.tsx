import { Route, Routes } from "react-router-dom";
import ContactPage from "./Pages/SellSomething";
import PharmacistsButton from "./Pages/PharmacistButton";
import RepportedMesseges from "./Pages/RepportedMesseges";

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Routes>
        {/* Public routes */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="pharmacists" element={<PharmacistsButton />} />
          <Route path="messages" element={<RepportedMesseges />} />
          
        
        {/* Admin routes */}
        
      </Routes>
    </div>
  );
}

export default App;