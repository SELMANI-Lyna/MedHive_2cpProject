import { FaHome, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa'; // NEW: Added FaSignOutAlt and FaCog
import { BsDatabaseFillDown } from "react-icons/bs";
import { MdReport } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import Button from './Button';
import { useNavigate } from "react-router-dom";


export default function AdminHeader() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
     
      <div 
  style={{ 
    backgroundColor: '#74A69D',
    padding: '60px',
    maxWidth: '280px',
    maxHeight: '800px',
    borderRadius: '45px',
    position: 'relative', // Needed for absolute positioning
    minHeight: '800px',
    marginTop: '60px',
  }} 
  className="flex flex-col items-center" // Removed justify-between
>
  {/* Top Section */}
  <div className="w-full">
  <h1 style= {{
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0px',
    marginTop: '-10px',
    

  }}>Administrateur</h1>

    <div className="mb-6">
      {[
        { icon: <FaHome style={{ marginRight: "5mm" }}
         onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(10px)"; // Move only slightly
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0px)"; // Reset to original position
        }} />, text: "Overview" },

        { icon: <FaUser style={{ marginRight: "5mm" }} 
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(10px)"; // Move only slightly
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0px)"; // Reset to original position
        }} />, text: "Pharmacists", path: "/pharmacists" },
        { icon: <MdReport style={{ marginRight: "5mm" }} 
         onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(20px)"; // Move only slightly
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0px)"; // Reset to original position
        }}/>, text: "Reported messages" },
        { icon: <BsDatabaseFillDown style={{ marginRight: "5mm" }} />, text: "Blog" },
        { icon: <RiTeamFill style={{ marginRight: "5mm" }} />, text: "Team" },
        { icon: <FaUser style={{ marginRight: "5mm" }} />, text: "Users" },
      ].map((item, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <Button
            text={
              <span style={{ marginRight: "10mm" }} className="flex items-center">
                {item.icon}
                {item.text}
              </span>
            }
            onClick={() => item.path && navigate(item.path)} // <-- navigation to path
              className="bg-blue-500 text-white px-4 py-2 w-full hover:bg-blue-600 active:bg-yellow-400 transition duration-200"
              width='200px'
              height='50px'
              borderRadius='80px'
          />
        </div>
      ))}
    </div>
    <hr className="w-full border-t-2 border-gray-300 my-4" />
  </div>

  {/* Bottom Buttons (Fixed at bottom) */}
  <div 
    style={{
      position: 'absolute',
      bottom: '20px',
      width: '100%',
      padding: '20px'
    }}
  >
    <div style={{ marginBottom: '20px', marginRight: '5mm' }}>
      <Button
        text={
          <span className="flex items-center">
            <FaCog style={{ marginLeft: "-20mm" }} />
            Settings
          </span>
        }
        onClick={() => console.log("Settings clicked")}
        className="bg-blue-500 text-white px-4 py-2 w-full hover:bg-blue-600 active:bg-yellow-400 transition duration-200"
        width='200px'
        height='50px'
        borderRadius='80px'
        
        
      />
    </div>
    <div>
      <Button 
        text={
          <span style={{ display: "flex", alignItems: "center", color: "#B13231" , marginLeft: "-20mm" }}>
  <FaSignOutAlt style={{ marginRight: "5mm" }} />
  <span style={{ fontWeight: "bold" }}>Logout</span>
</span>

        }
        onClick={() => console.log("Logout clicked")}
        className="bg-red-500 text-white px-4 py-2 w-full hover:bg-red-600 transition duration-200"
        width='200px'
        height='50px'
        borderRadius='80px'

      />
    </div>
  </div>
</div>

    </div>
  );
}