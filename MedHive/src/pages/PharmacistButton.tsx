import Adminsidebar from "../Components/Adminsidebar";
import Pharmacists from "../Components/Parmacists";

const PharmacistButton = () => {
  return (
    <div className="flex p-8">
      <div className="flex-1 ml-8">
        <Pharmacists />

        <Adminsidebar />
        {/* Add other content here */}
      </div>
    </div>
  );
};

export default PharmacistButton;
