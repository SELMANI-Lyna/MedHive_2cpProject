import Adminsidebar from "../Components/Adminsidebar.tsx";
import Searchbar from "../Components/Searchbar.tsx";
import NotificationButton from "../Components/Notification.tsx"; // Fix component name
import Adminprofile from "../Components/Adminprofile.tsx";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen"> {/* Sidebar + Content in one line */}
      <Adminsidebar /> {/* stays left */}

      <div className="flex-1 flex flex-col"> {/* Content side */}
        <div className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
          <Searchbar />
          <div className="flex items-center space-x-4">
            <NotificationButton />
            <Adminprofile adminName="Selmani Lyna" adminEmail="lenna4334@example.com" />
          </div>
        </div>

        <div className="p-8 flex-1 overflow-y-auto">
          
          {/* more page content */}
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;