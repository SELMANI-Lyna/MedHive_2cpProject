import AdminHeader from "../Components/Adminsidebar.tsx";
import Searchbar from "../Components/Searchbar.tsx";
import NotificationButton from "../Components/Notification.tsx"; // Fix component name
import AdminProfile from "../Components/Adminprofile.tsx";





export default function Dashboard() {
  return (
    <div className="p-4 flex max-w-full overflow-hidden">
      {/* Sidebar */}
      

      {/* Main Content */}
        <AdminHeader />
    
        {/* Main Content */}
      <div className="flex-1 ml-[50px]  mr-[20px]  overflow-hidden">
        <div className="flex items-center space-x-4 mb-6">
          <Searchbar />
          <NotificationButton />
          <AdminProfile adminName="yass" adminEmail="yass@estin.dz" />
        </div>
        {/* Main Content */}
        <div>
          <h1 className="text-2xl font-bold mb-6 mt-[100px]">Dashboard</h1>

          <div>
           
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
