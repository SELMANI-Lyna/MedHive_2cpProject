import Adminsidebar from "../components/Adminsidebar";
import Pharmacists from "../Components/Parmacists";

const PharmacistButton = () => {
  return (
    <div className="flex p-4">
      {/* Sidebar on the left */}
      <div className="w-90">
        <Adminsidebar />
      </div>

      {/* Main content area on the right */}
      <div className="flex-1 mr-110">
        <Pharmacists />
      </div>
    </div>
  );
};

export default PharmacistButton;
