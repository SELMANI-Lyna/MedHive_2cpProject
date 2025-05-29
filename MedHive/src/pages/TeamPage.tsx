import Team from "../components/Team";
import AdminHeader from "../components/Adminsidebar";
import NotificationButton from "../components/Notifications";
import Adminprofile from "../components/AdminProfile";
import SearchBar from "../components/Searchbaradmin";

const TeamPage = () => {
  return (
    <div className="p-4 flex max-w-full overflow-hidden">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <div className="flex-1 ml-[50px] mr-[20px] overflow-hidden">
        <div>
          <SearchBar />
          <NotificationButton />
          <Adminprofile adminName="yass" adminEmail="yass@estin.dz" />
        </div>

        {/* Main Content */}
        <div>
          <Team />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
