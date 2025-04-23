import Adminsidebar from "../Components/Adminsidebar.tsx";
import Searchbar from "../Components/Searchbar.tsx";
import NotificationButton from "../Components/Notification.tsx"; // Fix component name
import Adminprofile from "../Components/Adminprofile.tsx";
import Pharmacists from "../Components/Parmacists.tsx";

const PharmacistButton = () => {
  return (
    <div className="flex p-8">
      <Adminsidebar />
      <div className="flex-1 ml-8">
        <Searchbar />
        <NotificationButton /> {/* Fix component name */}
        <Adminprofile adminName="Selmani Lyna" adminEmail="lenna4334@example.com" />
        <Pharmacists />
        {/* Add other content here */}
      </div>
    </div>
  );
};

export default PharmacistButton;